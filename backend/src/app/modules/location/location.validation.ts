import { z } from 'zod'

const createLocationZodSchema = z.object({
  body: z.object({
    city: z.string().min(1, 'City is required').trim(),

    country: z.string().min(1, 'Country is required').trim(),
  }),
})

export const LocationValidation = {
  createLocationZodSchema,
}
