import { Schema, model, Document, Types } from 'mongoose'

export type JobType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship'

export type JobCategory =
  | 'Design'
  | 'Sales'
  | 'Marketing'
  | 'Finance'
  | 'Technology'
  | 'Engineering'
  | 'Business'
  | 'Human Resource'

export interface IJob {
  title: string
  company: string
  location: Types.ObjectId
  category: string
  type: JobType
  description: string
  tags: string[]
  isFeatured?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateJobPayload {
  title: string
  company: string
  location: string
  category: string
  type?: string
  description: string
  tags?: string[]
}

export interface JobQuery {
  search?: string
  category?: string
  isFeatured?: boolean
  location?: string
  page?: string
  limit?: string
}
