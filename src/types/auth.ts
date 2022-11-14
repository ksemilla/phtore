import { UserType } from "./users"

export type LoginProps = {
  email: string
  password: string
}

export interface LoginResult {
  login: {
    token: string
    user: UserType
  }
}