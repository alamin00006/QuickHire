import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import { IUser, UserRegistrationModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔐 Hide password in queries
    },

    role: {
      type: String,
      required: true,
      trim: true,
      default: 'client',
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
)

/* ===============================
   HASH PASSWORD BEFORE SAVE
================================ */

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds) || 10,
  )

  next()
})

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
) {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const UserRegistration = mongoose.model<IUser, UserRegistrationModel>(
  'UserRegistration',
  userSchema,
)
