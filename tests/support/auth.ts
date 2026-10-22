import { APIRequestContext, Page } from '@playwright/test';

const API = 'http://localhost:3000';

interface Credentials {
  email: string;
  password: string;
}

interface RegisterData extends Credentials {
  name?: string;
}

interface AuthResponse {
  token: string;
  user: { id: number };
}

interface RegisterResponse {
  message: string;
  id: number;
}

/** Log in through the API and return { token, user }. Faster and more stable than the UI. */
export async function loginViaAPI(request: APIRequestContext, { email, password }: Credentials): Promise<AuthResponse> {
  const res = await request.post(`${API}/api/login`, { data: { email, password } });
  if (!res.ok()) throw new Error(`API login failed: ${res.status()} ${await res.text()}`);
  return res.json();
}

/** Register a throwaway user through the API. Used to avoid locking shared accounts. */
export async function registerViaAPI(request: APIRequestContext, { name = 'Probe User', email, password }: RegisterData): Promise<RegisterResponse> {
  const res = await request.post(`${API}/api/register`, { data: { name, email, password } });
  if (!res.ok()) throw new Error(`API register failed: ${res.status()} ${await res.text()}`);
  return res.json();
}

/** Write the JWT into localStorage BEFORE the app loads, so the app is logged in on first paint. */
export async function seedAuthToken(page: Page, token: string): Promise<void> {
  await page.addInitScript((t: string) => { localStorage.setItem('token', t); }, token);
}