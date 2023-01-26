import { gql } from "@apollo/client"

export const GET_USERS = gql`
  query GetUsers($filter: UserFilterOptions!, $limit: Int, $skip: Int) {
    users(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        email
        firstName
        lastName
        name
        locked
        role
      }
      totalCount
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $data: UserUpdate!) {
    updateUser(id: $id, data: $data) {
      name
    }
  }
`
