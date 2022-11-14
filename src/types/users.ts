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
}

export type UserCreateType = {
  email: string
  password: string
  confirmPassword: string
}

export type UserCreateGraphType = {
  email: string
  password: string
}

export type UserCreateResponse = {
  acknowledge: boolean
  token: string
  inserted_id: string
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