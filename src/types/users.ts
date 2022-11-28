import { CreateResponse } from "./core"

export enum UserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export type UserType = {
  id: string
  email: string
  role: UserRoles
  name?: string
  locked: boolean
  phone: string
  mobile: string
  dateOfBirth: string
}

export type UserCreateType = {
  email: string
  password: string
  confirmPassword: string
}

export type UserUpdateInput = {
  email?: string
  name?: string
  dateOfBirth?: string
  phone?: string
  mobile?: string
}

export type UserCreateGraphType = {
  email: string
  password: string
}

export interface UserCreateResponse extends CreateResponse {
  token: string
}

export type UserListResult = {
  users: {
    list: UserType[]
    totalCount: number
  }
}

export type UserListInput = {
  filter?: {
    email?:  string
    name?: string
  }
  limit?: number
  skip?: number 
}