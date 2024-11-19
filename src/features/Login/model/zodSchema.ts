import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' }),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(4096, { message: 'Must be 4096 or fewer characters long' }),
});

export const loginForgotPasswordSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
});
