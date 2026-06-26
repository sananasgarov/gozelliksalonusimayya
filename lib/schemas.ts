import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string({ error: "Username is required." })
    .min(1, { error: "Username is required." })
    .max(64, { error: "Username is too long." })
    .trim(),
  password: z
    .string({ error: "Password is required." })
    .min(1, { error: "Password is required." })
    .max(128, { error: "Password is too long." }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
