import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        email
        id
        name
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
        phone
        mobile
        dateOfBirth
      }
    }
  }
`