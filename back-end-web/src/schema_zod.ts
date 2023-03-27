import * as z from "zod";

export const personSchema = z.object({
  name: z.string().min(3).max(255),
  professionId: z.number().int().positive(),
  phone: z.string().min(11).max(14).optional(),
  email: z.string().email().optional(),
  isEdit: z.boolean().optional(),
});