import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const payload = req.body

  const result = await userService.createUser(payload)

  if (result instanceof Error) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: result.message,
    })
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client registered successfully!',
    data: result,
  })
})

const createLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body

  // Call the login service
  const result = await userService.createLogin(email, password)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  createLogin,
}
