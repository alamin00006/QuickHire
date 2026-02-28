export type TClientStatus = 'active' | 'inactive'

import { Model } from 'mongoose'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  role: string
  status?: 'active' | 'inactive'
}

export interface UserRegistrationModel extends Model<IUser> {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

export interface IJwtPayload {
  id: string
  email?: string
  role: string
}
