import { Request } from 'express'
import {
  applyJobService,
  getAllApplicationsService,
  getApplicationsByJobService,
} from './application.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const applyJob = catchAsync(async (req: Request, res) => {
  const result = await applyJobService(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Application submitted successfully',
    data: result,
  })
})

const getApplicationsByJob = catchAsync(async (req: Request, res) => {
  const result = await getApplicationsByJobService(req.params.jobId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Applications fetched successfully',
    data: result,
  })
})

const getAllApplications = catchAsync(async (req: Request, res) => {
  const result = await getAllApplicationsService()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All applications fetched successfully',
    data: result,
  })
})
export const ApplicationController = {
  applyJob,
  getApplicationsByJob,
  getAllApplications,
}
