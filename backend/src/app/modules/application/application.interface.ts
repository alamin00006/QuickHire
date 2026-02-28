import { Types } from 'mongoose'

export interface IApplication {
  job_id: Types.ObjectId
  name: string
  email: string
  resume_link: string
  cover_note: string
  createdAt: Date
  updatedAt: Date
}
export interface ApplyPayload {
  job_id: string
  name: string
  email: string
  resume_link: string
  cover_note: string
}
