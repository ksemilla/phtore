import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        email
        id
        name
        firstName
        lastName
        role
        locked
        phone
        mobile
        dateOfBirth
      }
    }
  }
`

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      acknowledge
      user {
        email
        id
        role
        locked
        name
        firstName
        lastName
        phone
        mobile
        dateOfBirth
      }
    }
  }
`
