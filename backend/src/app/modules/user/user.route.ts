import express from 'express'
import { UserController } from '../user/user.controller'

const router = express.Router()

router.post(
  '/',

  UserController.createUser,
)
router.post('/login', UserController.createLogin)

export const UserRoutes = router
