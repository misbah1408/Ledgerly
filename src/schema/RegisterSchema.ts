import z from "zod";

export const registerUserSchema = z.object({
  name: z.string().nonempty(),
  email: z.email({
    message: "Please enter a valid email",
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }),
  password: z.string().nonempty(),
  role: z.enum(["ADMIN", "STAFF"]),
});

export const registerStoreSchema = z.object({
  name: z.string().nonempty(),
  address: z.string(),
});


export const registerSchema = z.object({
    registerRequest: registerUserSchema,
    storeRequest: registerStoreSchema
})

export type RegisterUser = z.infer<typeof registerSchema>;