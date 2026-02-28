import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ApplicationValidation } from './application.validation'
import { ApplicationController } from './application.controller'

const router = express.Router()

// Submit application (Public)
router.post(
  '/',
  validateRequest(ApplicationValidation.applyZodSchema),
  ApplicationController.applyJob,
)

// Admin view applications
router.get(
  '/job/:jobId',

  ApplicationController.getApplicationsByJob,
)
router.get(
  '/',

  ApplicationController.getAllApplications,
)

export const ApplicationRoutes = router
