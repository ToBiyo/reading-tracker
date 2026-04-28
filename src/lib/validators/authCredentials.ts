import { z } from "zod"

export const registrationSchema = z.object({
  name: z.string()
  .min(3, "Name must be at least 3 characters")
  .max(50, "Name is too long")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name can only contain letters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export type RegistrationInput = z.infer<typeof registrationSchema>