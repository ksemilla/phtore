import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      email
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($data: UserCreate!) {
    createUser(data: $data) {
      token
      acknowledge
      insertedId
    }
  }
`