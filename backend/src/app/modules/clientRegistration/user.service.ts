import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { IUser } from './user.interface'
import { UserRegistration } from './user.model'

/* ===============================
   🧑‍💻 REGISTER USER
================================ */

const createUserRegistration = async (payload: IUser) => {
  // 🔎 Check existing user by email
  const isExist = await UserRegistration.findOne({
    email: payload.email,
  })

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User already registered with this email.',
    )
  }

  // ✅ Create user (password auto hashed in pre-save)
  const user = await UserRegistration.create(payload)

  // 🔐 Generate JWT
  const token = jwtHelpers.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  return { token, user }
}

/* ===============================
   🔑 LOGIN USER
================================ */

const createLogin = async (email: string, password: string) => {
  console.log(password)
  if (!email || !password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Please provide email and password.',
    )
  }

  //  Must select password manually
  const user = await UserRegistration.findOne({ email }).select('+password')

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this email.')
  }

  //  Check status
  if (user.status !== 'active') {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      'Your account is inactive. Please contact support.',
    )
  }

  //  Compare password
  const isMatched = await UserRegistration.isPasswordMatched(
    password,
    user.password,
  )

  if (!isMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials.')
  }
  console.log(user)
  //  Generate token
  const token = jwtHelpers.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  })

  // Remove password before return
  user.password = undefined as any

  return { token, user }
}

/* ===============================
    GET USER BY EMAIL
================================ */

const getUserByEmail = async (email: string) => {
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required.')
  }

  const user = await UserRegistration.findOne({ email })

  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No account found with this email.',
    )
  }

  return user
}

/* ===============================
    GET ALL USERS
================================ */

const getAllUsers = async () => {
  const users = await UserRegistration.find({})
  return users
}

export const userService = {
  createUserRegistration,
  createLogin,
  getUserByEmail,
  getAllUsers,
}
