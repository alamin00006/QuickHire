import { Request } from 'express'

import {
  createJobService,
  getAllJobsService,
  getSingleJobService,
  deleteJobService,
  updateJobService,
} from './job.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const createJob = catchAsync(async (req: Request, res) => {
  const result = await createJobService(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Job created successfully',
    data: result,
  })
})

const getAllJobs = catchAsync(async (req: Request, res) => {
  const result = await getAllJobsService(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Jobs fetched successfully',
    meta: {
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
      total: result.total,
    },
    data: result.jobs,
  })
})

const getSingleJob = catchAsync(async (req: Request, res) => {
  const result = await getSingleJobService(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job fetched successfully',
    data: result,
  })
})

const deleteJob = catchAsync(async (req: Request, res) => {
  await deleteJobService(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job deleted successfully',
  })
})
const updateJob = catchAsync(async (req: Request, res) => {
  const result = await updateJobService(req.params.id, req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Job updated successfully',
    data: result,
  })
})
export const JobController = {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
}
