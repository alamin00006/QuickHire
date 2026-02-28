import { z } from 'zod'

const createClientRegistrationZodSchema = z.object({
  body: z.object({
    id: z.string(),
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters'),
    email: z.string().optional(),
    mobile: z.string().min(8, 'Mobile number must be at least 8 digits'),
    whatsapp: z.string().optional(),

    status: z.enum(['active', 'inactive']).optional(),
  }),
})

export const ClientRegistrationValidation = {
  createClientRegistrationZodSchema,
}
