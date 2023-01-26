import { CreateResponse, Order, OrderCreateInput } from "@/types"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client"

const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderCreateInput!) {
    createOrder(input: $input) {
      acknowledge
      insertedId
    }
  }
`

const LIST_ORDER = gql`
  query GetOrders($filter: OrderFilterOptions!, $limit: Int, $skip: Int) {
    orders(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        entity
        customer
        customerType
        customerData
        shippingFee
        billingInfo
        shippingSameAsBilling
        shippingInfo
        orderItems {
          product
          sellPrice
          listPrice
          quantity
        }
        status
      }
      totalCount
    }
  }
`

export const useCreateOrder = () => {
  return useMutation<{ createOrder: CreateResponse; input: OrderCreateInput }>(
    CREATE_ORDER
  )
}

export const useListOrder = ({
  entity,
  limit = 10,
  skip = 0,
}: {
  entity: string
  limit: number
  skip: number
}) => {
  return useQuery<
    { orders: { list: Order[]; totalCount: number } },
    { filter: { entity: string }; limit: number; skip: number }
  >(LIST_ORDER, {
    variables: { filter: { entity }, limit, skip },
    fetchPolicy: "no-cache",
  })
}
