import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'portfolio-pilot-auth';

export async function checkAuth() {
  const cookieStore = cookies();
  return cookieStore.has(AUTH_COOKIE_NAME);
}

export async function setAuthCookie() {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
