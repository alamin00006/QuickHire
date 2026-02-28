import express from 'express'
import validateRequest from '../../middlewares/validateRequest'

import { LocationController } from './location.controller'
import { LocationValidation } from './location.validation'

const router = express.Router()

//  Public Routes
router.get('/', LocationController.getAllLocations)
router.get('/:id', LocationController.getSingleLocation)

//  Admin Routes
router.post(
  '/',
  // auth(USER_ROLE.ADMIN), // Uncomment if using role system
  validateRequest(LocationValidation.createLocationZodSchema),
  LocationController.createLocation,
)

router.delete(
  '/:id',
  // auth(USER_ROLE.ADMIN),
  LocationController.deleteLocation,
)

export const LocationRoutes = router
