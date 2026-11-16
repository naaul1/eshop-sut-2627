import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, APIRequestContext, Page, Response } from '@playwright/test';
import { applyApiThrottle } from '../support/throttle';

const API_URL = 'http://localhost:3000/api';

const productData = JSON.parse(
  readFileSync(join(__dirname, 'data', 'fr15-products.json'), 'utf8'),
) as {
  admin: { email: string; password: string };
  product: {
    namePrefix: string;
    price: number;
    updatedPrice: number;
    description: string;
    imageUrl: string;
    categoryId: number;
  };
  categories: { id: number; name: string }[];
  seedProductNames: string[];
  validationCases: {
    title: string;
    nameValue?: string;
    nameLength?: number;
    price: number | string;
    categoryId?: number;
    expectedOutcome: 'accept' | 'reject';
  }[];
};

type ProductRecord = {
  id: number;
  name: string;
  price: number | string | null;
  description: string;
  category_id: number | string;
};

function uniqueProductName(label: string): string {
  return `${productData.product.namePrefix} ${label} ${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

function uniqueProductNameOfLength(length: number, suffix: string): string {
  return `${'P'.repeat(length - suffix.length)}${suffix}`;
}

async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' });
  await page.getByPlaceholder('Email').fill(productData.admin.email);
  await page.getByPlaceholder('Password').fill(productData.admin.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Sản phẩm', { exact: true })).toBeVisible();
}

async function openProductsTab(page: Page): Promise<void> {
  await page.getByText('Sản phẩm', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý Sản phẩm' })).toBeVisible();
}

async function fillProductForm(
  page: Page,
  name: string,
  price: number | string,
  description: string,
  categoryId: number,
): Promise<void> {
  const category = productData.categories.find(({ id }) => id === categoryId);
  if (!category) throw new Error(`Unknown fixture category id: ${categoryId}`);

  await page.getByPlaceholder('Tên sản phẩm').fill(name);
  await page.getByPlaceholder('Giá tiền').fill(String(price));
  await page.getByPlaceholder('Mô tả').fill(description);
  const categorySelect = page.locator('form select');
  await categorySelect.selectOption({ label: category.name });
  await expect(categorySelect).toHaveValue(String(categoryId));
}

async function createProductThroughUI(page: Page, name: string): Promise<number> {
  const responsePromise = page.waitForResponse(
    (response) =>
      response.request().method() === 'POST' &&
      response.url() === `${API_URL}/products`,
  );

  await fillProductForm(
    page,
    name,
    productData.product.price,
    productData.product.description,
    productData.product.categoryId,
  );
  await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();

  const response = await responsePromise;
  expect(response.ok()).toBe(true);
  const result = await response.json() as { id: number };
  return result.id;
}

async function getProducts(request: APIRequestContext): Promise<ProductRecord[]> {
  const response = await request.get(`${API_URL}/products`);
  expect(response.ok()).toBe(true);
  return response.json();
}

async function createProductThroughAPI(
  request: APIRequestContext,
  name: string,
): Promise<number> {
  const response = await request.post(`${API_URL}/products`, {
    data: {
      name,
      price: productData.product.price,
      description: productData.product.description,
      imageUrl: productData.product.imageUrl,
      category_id: productData.product.categoryId,
    },
  });
  expect(response.ok()).toBe(true);
  const result = await response.json() as { id: number };
  return result.id;
}

async function deleteProductById(
  request: APIRequestContext,
  productId: number,
): Promise<void> {
  const response = await request.delete(`${API_URL}/products/${productId}`);
  expect(response.ok()).toBe(true);
}

test.beforeEach(async ({ page }) => {
  const delay = Number(process.env.THROTTLE_MS || 0);
  if (delay > 0) await applyApiThrottle(page, delay);
});

test('PROD-01: create a product with valid data', async ({ page, request }) => {
  const name = uniqueProductName('create');
  let productId: number | undefined;

  try {
    await loginAsAdmin(page);
    await openProductsTab(page);
    productId = await createProductThroughUI(page, name);

    const row = page.locator('table tbody tr').filter({ hasText: name });
    await expect.soft(row).toBeVisible();
    await expect.soft(row).toContainText(`${productData.product.price} ₫`);

    const response = await request.get(`${API_URL}/products`);
    expect(response.ok()).toBe(true);
    const products = await response.json() as {
      id: number;
      name: string;
      price: number;
      category_id: number;
    }[];
    const createdProduct = products.find((product) => product.id === productId);
    expect(createdProduct?.name).toBe(name);
    expect(createdProduct?.price).toBe(productData.product.price);
    expect(createdProduct?.category_id).toBe(productData.product.categoryId);
  } finally {
    if (productId !== undefined) await deleteProductById(request, productId);
  }
});

test('PROD-02: view the existing product list', async ({ page }) => {
  await loginAsAdmin(page);
  await openProductsTab(page);

  const rows = page.locator('table tbody tr');
  for (const name of productData.seedProductNames) {
    const row = rows.filter({ hasText: name });
    await expect.soft(row).toHaveCount(1);
    await expect.soft(row).toBeVisible();
  }
});

test('FIND-PROD-03: editing one product leaves other products unchanged', async ({
  page,
  request,
}) => {
  const targetName = uniqueProductName('edit-target');
  const otherName = uniqueProductName('edit-other');
  const editedCategoryId = productData.categories.find(
    ({ id }) => id !== productData.product.categoryId,
  )?.id;
  if (editedCategoryId === undefined) {
    throw new Error('Fixture must include a category different from the product default.');
  }
  const targetId = await createProductThroughAPI(request, targetName);
  let otherId: number | undefined;

  try {
    otherId = await createProductThroughAPI(request, otherName);
    await loginAsAdmin(page);
    await openProductsTab(page);

    const targetRow = page.locator('table tbody tr').filter({ hasText: targetName });
    await targetRow.getByRole('button', { name: 'Sửa' }).click();
    await page.getByPlaceholder('Giá tiền').fill(String(productData.product.updatedPrice));
    await page.locator('form select').selectOption(String(editedCategoryId));
    page.once('dialog', (dialog) => dialog.accept());
    await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();

    const updatedRow = page.locator('table tbody tr').filter({ hasText: targetName });
    const otherRow = page.locator('table tbody tr').filter({ hasText: otherName });
    await expect.soft(updatedRow).toHaveCount(1);
    await expect.soft(otherRow).toHaveCount(1);

    const response = await request.get(`${API_URL}/products`);
    expect(response.ok()).toBe(true);
    const products = await response.json() as ProductRecord[];
    const targetProduct = products.find((product) => product.id === targetId);
    const otherProduct = products.find((product) => product.id === otherId);
    expect(targetProduct?.name).toBe(targetName);
    expect(Number(targetProduct?.price)).toBe(productData.product.updatedPrice);
    expect(Number(targetProduct?.category_id)).toBe(editedCategoryId);
    expect(targetProduct?.description).toBe(productData.product.description);
    expect(otherProduct?.name).toBe(otherName);
    expect(Number(otherProduct?.price)).toBe(productData.product.price);
    expect(Number(otherProduct?.category_id)).toBe(productData.product.categoryId);
    expect(otherProduct?.description).toBe(productData.product.description);
  } finally {
    await deleteProductById(request, targetId);
    if (otherId !== undefined) await deleteProductById(request, otherId);
  }
});

test('PROD-04: delete a product', async ({ page, request }) => {
  const name = uniqueProductName('delete');
  let productId: number | undefined;

  try {
    await loginAsAdmin(page);
    await openProductsTab(page);
    productId = await createProductThroughUI(page, name);

    const row = page.locator('table tbody tr').filter({ hasText: name });
    await row.getByRole('button', { name: 'Xóa' }).click();
    await expect.soft(row).toHaveCount(0);

    const response = await request.get(`${API_URL}/products`);
    expect(response.ok()).toBe(true);
    const products = await response.json() as { id: number }[];
    expect(products.some((product) => product.id === productId)).toBe(false);
  } finally {
    if (productId !== undefined) await deleteProductById(request, productId);
  }
});

for (const testCase of productData.validationCases) {
  test(testCase.title, async ({ page, request }) => {
    const suffix = `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
    const name =
      testCase.nameValue !== undefined
        ? testCase.nameValue
        : testCase.nameLength !== undefined
          ? uniqueProductNameOfLength(testCase.nameLength, suffix)
          : uniqueProductName(testCase.title);
    const description = `${productData.product.description} ${suffix}`;
    const categoryId = testCase.categoryId ?? productData.product.categoryId;

    try {
      await loginAsAdmin(page);
      await openProductsTab(page);
      await fillProductForm(page, name, testCase.price, description, categoryId);

      let productResponse: Response | undefined;
      page.on('response', (response) => {
        if (
          response.request().method() === 'POST' &&
          response.url() === `${API_URL}/products`
        ) {
          productResponse = response;
        }
      });
      page.on('dialog', (dialog) => dialog.accept());
      await page.getByRole('button', { name: 'Lưu sản phẩm' }).click();

      if (testCase.expectedOutcome === 'reject') {
        const form = page.locator('form');
        await expect.poll(async () =>
          productResponse !== undefined ||
          !(await form.evaluate((element) =>
            (element as HTMLFormElement).checkValidity(),
          )),
        ).toBe(true);

        if (productResponse) {
          expect.soft(productResponse.status()).toBeGreaterThanOrEqual(400);
          expect.soft(productResponse.status()).toBeLessThan(500);
          expect.soft(productResponse.ok()).toBe(false);
        } else {
          expect.soft(
            await form.evaluate((element) =>
              (element as HTMLFormElement).checkValidity(),
            ),
          ).toBe(false);
        }
      }

      const createdProducts = (await getProducts(request)).filter(
        (product) => product.description === description,
      );
      if (testCase.expectedOutcome === 'reject') {
        await expect.soft(createdProducts).toHaveLength(0);
      } else {
        await expect.soft(createdProducts).toHaveLength(1);
        const createdProduct = createdProducts[0];
        if (createdProduct) {
          const row = page.locator('table tbody tr').filter({ hasText: name });
          await expect.soft(row).toBeVisible();
          expect.soft(createdProduct.name).toBe(name);
          expect.soft(Number(createdProduct.price)).toBe(Number(testCase.price));
          expect.soft(Number(createdProduct.category_id)).toBe(categoryId);
        }
      }
    } finally {
      const createdProducts = (await getProducts(request)).filter(
        (product) => product.description === description,
      );
      for (const product of createdProducts) {
        await deleteProductById(request, product.id);
      }
    }
  });
}
