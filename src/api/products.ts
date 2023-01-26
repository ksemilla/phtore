import { ProductType } from "@/types"
import { useQuery, gql } from "@apollo/client"

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
      id
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
      quantity
      photoData {
        url
      }
    }
  }
`

export const CREATE_ITEM = gql`
  mutation CreateITEM($input: ItemCreateInput!) {
    createItem(input: $input) {
      acknowledge
      insertedId
    }
  }
`

export const GET_ITEMS = gql`
  query Items($filter: ItemFilterOptions!, $limit: Int, $skip: Int) {
    items(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        name
        description
        categories {
          name
          choices {
            name
          }
        }
        instances {
          product {
            id
            name
            photoData {
              url
            }
          }
        }
      }
      totalCount
    }
  }
`

export const GET_ITEM = gql`
  query Item($id: String!) {
    item(id: $id) {
      id
      name
      description
      categories {
        name
        choices {
          name
        }
      }
      instances {
        product {
          id
          name
          photoData {
            url
          }
        }
        attributes {
          name
          value
        }
      }
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: String!, $input: ItemEditInput!) {
    updateItem(id: $id, input: $input) {
      id
    }
  }
`

export const useQueryProduct = (id: string) => {
  return useQuery<{ product: ProductType }>(GET_PRODUCT, {
    variables: { id },
    fetchPolicy: "no-cache",
  })
}
