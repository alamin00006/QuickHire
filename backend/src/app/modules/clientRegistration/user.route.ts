import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/',

  UserController.createClientRegistration,
)
router.post('/login', UserController.createLogin)

export const UserRoutes = router
