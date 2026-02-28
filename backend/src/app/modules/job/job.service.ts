import { CreateJobPayload, JobQuery } from './job.interface'
import { Job } from './job.model'
import mongoose from 'mongoose'

export const createJobService = async (payload: CreateJobPayload) => {
  return await Job.create(payload)
}

export const getAllJobsService = async (query: JobQuery) => {
  const {
    search,
    category,
    isFeatured,
    location,
    page = '1',
    limit = '10',
  } = query

  const filter: any = {}

  if (category) {
    filter.category = category
  }

  if (isFeatured !== undefined) {
    filter.isFeatured = isFeatured
  }

  if (location && mongoose.Types.ObjectId.isValid(location)) {
    filter.location = location
  }

  // Search
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  const skip = (Number(page) - 1) * Number(limit)

  const jobs = await Job.find(filter)
    .populate('location')
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 })

  const total = await Job.countDocuments(filter)

  return { jobs, total }
}

export const getSingleJobService = async (id: string) =>
  Job.findById(id).populate('location')

export const updateJobService = async (
  id: string,
  payload: Partial<CreateJobPayload>,
) => {
  const updatedJob = await Job.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('location')

  return updatedJob
}
export const deleteJobService = async (id: string) => Job.findByIdAndDelete(id)
