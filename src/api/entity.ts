import { gql } from "@apollo/client";

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