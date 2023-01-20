import { DeliveryMethod, DeliveryMethodCreateInput } from "@/types";
import { CreateResponse } from "@/types/core";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

export const FIND_ENTITY_BY_SLUG = gql`
  query GetEntityBySlug($slug: String!) {
    findEntityBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`

export const CREATE_ENTITY = gql`
  mutation CreateEntity($input: EntityCreateInput!) {
    createEntity(input: $input) {
      acknowledge
      insertedId
    }
  }
`

export const MY_ENTITIES = gql`
  query MyEntities($limit: Int, $skip: Int) {
    myEntities(limit: $limit, skip: $skip) {
      id
      name
      slug
      bannerData {
        url
      }
    }
  }
`

export const GET_ENTITIES = gql`
  query Entities($filter: EntityFilterOptions!, $limit: Int, $skip: Int) {
    entities(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        name
        slug
        bannerData {
          url
        }
      }
      totalCount
    }
  }
`

export const GET_ENTITY = gql`
  query Entity($slug: String!) {
    entity(slug: $slug) {
      id
      name
      slug
      banner
      bannerData {
        url
      }
    }
  }
`

const CREATE_DELIVERY_METHOD = gql`
  mutation CreateDeliveryMethod($input: DeliveryMethodCreateInput!) {
    createDeliveryMethod(input: $input) {
      acknowledge
      insertedId
    }
  }
`

const GET_DELIVERY_METHODS = gql`
  query GetDeliveryMethods($filter: DeliveryMethodFilterOptions!, $limit: Int, $skip: Int) {
    deliveryMethods(filter: $filter, limit: $limit, skip: $skip) {
      list {
        id
        name
        description
        sellPrice
        listPrice
      }
      totalCount
    }
  }
`

export const useDeliveryMethodCreate = () => {
  return useMutation<{ createDeliveryMethod: CreateResponse }, { input: DeliveryMethodCreateInput }>(CREATE_DELIVERY_METHOD)
}

export const useQueryDeliveryMethodList = () => {
  return useLazyQuery<{ deliveryMethods: {list: DeliveryMethod[], total: number} }, { filter: { entity: string }, limit?: number, skip?: number }>(GET_DELIVERY_METHODS)
}