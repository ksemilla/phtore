import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductCreateInput!) {
    createProduct(input: $input) {
      acknowledge
      insertedId
    }
  }
`

export const GET_PRODUCTS = gql`
  query Products($filter: ProductFilterOptions!, $limit: Int, $skip: Int) {
    products(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        code
        name
        isActive
        quantity
      }
      totalCount
    }
  }
`

export const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      entity
      code
      name
      photo
      quantity
      type
      isActive
      sellPrice
      listPrice
      photoData {
        url
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: String!, $input: ProductEditInput!) {
    updateProduct(id: $id, input: $input) {
      id
    }
  }
`

export const FIND_PRODUCT_BY_NAME = gql`
  query GetProductsByName($filter: ProductFilterOptions!) {
    findProductsByName(filter: $filter) {
      id
      name
    }
  }
`