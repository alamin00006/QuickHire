import { z } from 'zod'

const applyZodSchema = z.object({
  body: z.object({
    job_id: z.string().min(1, 'Job ID is required'),

    name: z
      .string()
      .min(1, 'Name is required')
      .max(100, 'Name cannot exceed 100 characters'),

    email: z.string().email('Please provide a valid email address'),

    resume_link: z
      .string()
      .url('Resume link must be a valid URL')
      .refine(
        url => url.startsWith('http://') || url.startsWith('https://'),
        'Resume link must start with http:// or https://',
      ),

    cover_note: z
      .string()
      .min(1, 'Cover note is required')
      .max(2000, 'Cover note cannot exceed 2000 characters'),
  }),
})

export const ApplicationValidation = {
  applyZodSchema,
}
