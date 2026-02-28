import { ApplyPayload } from './application.interface'
import { Application } from './application.model'

export const applyJobService = async (payload: ApplyPayload) =>
  Application.create(payload)

export const getApplicationsByJobService = async (jobId: string) =>
  Application.find({ job_id: jobId }).sort({ createdAt: -1 })

/**
 * Get all applications
 */

export const getAllApplicationsService = async () => {
  const applications = await Application.find().sort({ createdAt: -1 })
  return applications
}
