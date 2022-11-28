export type EntityType = {
  id: string
  name: string
  slug: string
}

export type EntityCreateInput = {
  name: string
}

export type MyEntityListResult = {
  myEntities: {
    list: EntityType[]
    totalCount: number
  }
}

export type MyEntityListInput = {
  limit?: number
  skip?: number 
}