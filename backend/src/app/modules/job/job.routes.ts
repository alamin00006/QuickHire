import express from 'express'
import validateRequest from '../../middlewares/validateRequest'

import { JobValidation } from './job.validation'

import { JobController } from './job.controller'

const router = express.Router()

// Public routes
router.get('/', JobController.getAllJobs)
router.get('/:id', JobController.getSingleJob)

// Admin-only routes
router.post(
  '/',

  validateRequest(JobValidation.createJobZodSchema),
  JobController.createJob,
)

router.patch('/:id', JobController.updateJob)
router.delete('/:id', JobController.deleteJob)

export const JobRoutes = router
