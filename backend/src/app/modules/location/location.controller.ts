import { Request } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  createLocationService,
  getAllLocationsService,
  getSingleLocationService,
  deleteLocationService,
} from './location.service'

const createLocation = catchAsync(async (req: Request, res) => {
  const result = await createLocationService(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Location created successfully',
    data: result,
  })
})

const getAllLocations = catchAsync(async (req: Request, res) => {
  const result = await getAllLocationsService(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Locations fetched successfully',
    meta: {
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 10),
      total: result.total,
    },
    data: result.locations,
  })
})

const getSingleLocation = catchAsync(async (req: Request, res) => {
  const result = await getSingleLocationService(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Location fetched successfully',
    data: result,
  })
})

const deleteLocation = catchAsync(async (req: Request, res) => {
  await deleteLocationService(req.params.id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Location deleted successfully',
  })
})

export const LocationController = {
  createLocation,
  getAllLocations,
  getSingleLocation,
  deleteLocation,
}
