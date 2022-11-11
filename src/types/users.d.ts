export type UserType = {
  id: string
  email: string
  role: string
  name?: string
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