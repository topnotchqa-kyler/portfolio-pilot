import { cookies } from 'next/headers';

export const AUTH_COOKIE_NAME = 'kylers-testing-playground-auth';

export async function checkAuth() {
  const cookieStore = await cookies();
  return !!cookieStore.get(AUTH_COOKIE_NAME);
}

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
