'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { setAuthCookie, removeAuthCookie } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function login(values: unknown) {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  // In a real app, you would verify user credentials here
  await setAuthCookie();
  redirect('/dashboard');
}

export async function signup(values: unknown) {
  const validatedFields = signupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  // In a real app, you would create a new user here
  await setAuthCookie();
  redirect('/dashboard');
}

export async function logout() {
  await removeAuthCookie();
  redirect('/login');
}
