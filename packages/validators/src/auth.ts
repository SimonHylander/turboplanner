import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(4),
  password: z.string().min(8),
});
