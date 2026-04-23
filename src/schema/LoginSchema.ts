import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Please enter a valid email",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }),
  password: z.string(),
});

export type LoginUser = z.infer<typeof loginSchema>;
