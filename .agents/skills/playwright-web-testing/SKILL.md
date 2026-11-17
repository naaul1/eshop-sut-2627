---
name: playwright-web-testing
description: 'Tạo bộ kiểm thử giao diện Playwright dạng Page Object Model cho một mã tính năng và các mã test case được chọn. Đầu vào gồm mã tính năng, mã test case tùy chọn, file spec và file test cases; mặc định bao phủ mọi test case liên quan nếu không chỉ định mã. Đầu ra gồm mã nguồn POM, test script và test data JSON, chạy trên Chromium, Firefox và WebKit.'
argument-hint: 'Cung cấp mã tính năng, danh sách mã test case tùy chọn, file spec và file test cases.'
user-invocable: true
---

# Playwright Web Testing

## Mục đích

Chuyển đặc tả và test case của một tính năng web thành bộ automation Playwright có cấu trúc:

- Page Object Model (POM) chứa locator và thao tác UI.
- Test script TypeScript dùng POM.
- File JSON chứa dữ liệu test để chạy data-driven.

Skill này dành cho kiểm thử web end-to-end. Không tự sửa mã ứng dụng để làm test pass; nếu UI lệch đặc tả hoặc selector không ổn định, phải ghi rõ trong kết quả và ưu tiên selector hiện có hoặc selector semantic ổn định.

## Đầu vào

Người dùng cung cấp:

1. **Mã tính năng**, ví dụ `FR-03`.
2. **Mã test case**, ví dụ `TC-FR03-01, TC-FR03-02`.
   - Nếu không có, chọn tất cả test case liên quan đến mã tính năng trong file test cases.
3. **File spec**, chứa yêu cầu UI/nghiệp vụ, route, trạng thái và expected result.
4. **File test cases**, thường là Markdown/CSV/JSON.

Nếu một file không được chỉ rõ, tìm các file có tên chứa mã tính năng trong `reports/`, `tests/`, `docs/` và thư mục mã nguồn. Không tự bịa expected result khi spec/test case chưa cung cấp.

## Cấu trúc đầu ra

Mặc định dùng cấu trúc:

```text
tests/
  pages/
    <FeatureName>Page.ts
  <FEATURE>/
    <feature-name>.spec.ts
    <feature-name>-cases.json
```

Giữ nguyên cấu trúc POM hiện có nếu repository đã có convention khác.

### POM

POM phải:

- Nhận `Page` trong constructor.
- Khai báo locator có tên theo vai trò, không rải selector trong test.
- Có method cho các thao tác nghiệp vụ chính: mở trang, nhập dữ liệu, submit, chuyển bước, đọc feedback.
- Dùng locator ưu tiên theo thứ tự:
  1. `getByRole` với accessible name.
  2. `getByLabel` khi label được liên kết đúng.
  3. `getByText` cho nội dung ổn định.
  4. `data-testid`/`id` đã có.
  5. CSS theo thuộc tính ổn định.
- Không dùng XPath hoặc CSS theo class Tailwind nếu có locator semantic tốt hơn.
- Không dùng `page.waitForTimeout`; dùng auto-wait và assertion.
- Nếu một selector chỉ đúng ở một bước, giới hạn locator trong form/container của bước đó.

Ví dụ khung:

```ts
import { expect, Locator, Page } from '@playwright/test';

export class FeaturePage {
  readonly page: Page;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.getByRole('button', { name: 'Gửi' });
  }

  async open(): Promise<void> {
    await this.page.goto('/feature-route');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.submitButton).toBeVisible();
  }
}
```

### Test data JSON

Mỗi record phải có mã test case và dữ liệu cần cho test:

```json
[
  {
    "id": "TC-FR00-01",
    "category": "valid",
    "input": "value",
    "expected": "success"
  }
]
```

Chỉ đưa vào JSON các test case được chọn. Khi không có danh sách mã test case, đưa toàn bộ case thuộc tính năng vào JSON. Không lưu credential/token thật trong file.

### Test script

Test script phải:

- Import JSON bằng import tĩnh hoặc cơ chế JSON được repository hỗ trợ.
- Tạo test bằng vòng lặp data-driven, không copy một test cho từng giá trị.
- Tái sử dụng POM.
- Dùng `test.describe` để nhóm theo bước/nhóm dữ liệu.
- Duy trì mã test case trong tên test.
- Bao phủ ít nhất ba assertion pattern khác nhau khi UI cho phép. Ưu tiên các pattern:
  - `toHaveURL`
  - `toBeVisible`/`toBeHidden`
  - `toHaveText`/`toContainText`
  - `toHaveValue`
  - `toHaveAttribute`
  - `toMatch` trên text/giá trị sinh
  - `toHaveProperty` hoặc status/body assertion cho API phụ trợ
- Với browser dialog, đăng ký `page.waitForEvent('dialog')` trước thao tác gây dialog, kiểm tra message rồi `dismiss()`.
- Không dùng assertion “success-shaped” hoặc bỏ qua lỗi; nếu expected result không rõ, đánh dấu case cần xác nhận thay vì đoán.

## Quy trình thực hiện

1. Đọc file spec, file test cases và cấu hình Playwright.
2. Xác định route, màn hình, form, trạng thái, API phụ trợ và dữ liệu chuẩn.
3. Lập bảng ánh xạ:
   - test case → category/flow;
   - input JSON → thao tác POM;
   - expected result → assertion.
4. Kiểm tra mã test case:
   - Nếu người dùng chỉ định mã, báo lỗi rõ nếu mã không tồn tại.
   - Nếu không chỉ định, chọn toàn bộ mã liên quan đến feature.
   - Không silently bỏ qua test case thiếu dữ liệu.
5. Tạo hoặc cập nhật POM.
6. Tạo JSON data.
7. Tạo test script data-driven.
8. Xác nhận `playwright.config` có project Chromium, Firefox và WebKit.
   - Nếu thiếu project, chỉ bổ sung cấu hình khi đó là thay đổi trực tiếp cần thiết và không làm mất cấu hình hiện có.
9. Chạy kiểm tra tối thiểu:

```powershell
npx playwright test --list
npx playwright test <spec-path> --project=chromium
```

Chạy toàn bộ browser nếu môi trường và thời gian cho phép:

```powershell
npx playwright test <spec-path>
```

10. Kiểm tra `git diff --check`, báo cáo số test được discover và kết quả chạy.
11. Nếu test làm thay đổi database hoặc dữ liệu dùng chung, khôi phục dữ liệu test đã tạo sau validation nếu có thể; không xóa thay đổi của người dùng.

## Quy tắc xử lý lỗi và giới hạn

- Nếu test runner không tìm thấy test, kiểm tra `testDir`, glob file và tên file trước khi kết luận.
- Nếu thiếu browser binary/dependency, báo đúng lệnh hoặc dependency còn thiếu; không tự thêm package nếu chưa cần.
- Nếu POM không thể định vị một element vì UI thiếu semantic selector, dùng selector ổn định nhất đang có và ghi rõ rủi ro.
- Nếu implementation không tuân thủ spec, test phải phản ánh expected của spec hoặc expected runtime đã được xác nhận; ghi rõ test nào dự kiến FAIL.
- Không sửa backend/frontend chỉ để làm automation pass, trừ khi người dùng yêu cầu sửa sản phẩm.
- Không chạy song song các test có dùng cùng một tài khoản/dữ liệu mutable nếu điều đó gây race condition.
- Không hardcode OTP/token do runtime sinh; lấy từ UI/API response trong cùng test flow.

## Tiêu chí hoàn tất

- Có POM, test script và JSON data ở đúng vị trí.
- Mọi test case được yêu cầu đều có record/test tương ứng, hoặc có lý do rõ ràng nếu bị chặn.
- Test script là data-driven và tái sử dụng POM.
- Test được discover trên Chromium, Firefox và WebKit.
- Có ít nhất ba assertion pattern khác nhau.
- Không có selector phụ thuộc không cần thiết vào class trình bày.
- `git diff --check` sạch.
- Báo cáo rõ lệnh đã chạy, số test discover, kết quả và các case bị ảnh hưởng bởi lỗi implementation.
