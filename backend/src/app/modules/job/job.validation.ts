import { z } from 'zod'

const createJobZodSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Job title is required')
      .max(200, 'Title cannot exceed 200 characters'),

    company: z
      .string()
      .min(1, 'Company name is required')
      .max(100, 'Company name cannot exceed 100 characters'),

    location: z
      .string()
      .min(1, 'Location is required')
      .max(100, 'Location cannot exceed 100 characters'),

    // category: z.enum([
    //   'Design',
    //   'Sales',
    //   'Marketing',
    //   'Finance',
    //   'Technology',
    //   'Engineering',
    //   'Business',
    //   'Human Resource',
    // ]),

    type: z
      .enum(['Full Time', 'Part Time', 'Contract', 'Internship'])
      .optional(),

    description: z
      .string()
      .min(1, 'Job description is required')
      .max(5000, 'Description cannot exceed 5000 characters'),

    tags: z.array(z.string()).optional(),
  }),
})

export const JobValidation = {
  createJobZodSchema,
}
