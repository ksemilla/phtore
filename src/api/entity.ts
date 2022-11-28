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
      list {
        id
        name
        slug
      }
      totalCount
    }
  }
`