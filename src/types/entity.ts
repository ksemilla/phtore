import { DatafeedType } from "./datafeed"

export type EntityType = {
  id: string
  name: string
  slug: string
  banner: string
  bannerData: DatafeedType
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

export type EntityListResult = {
  entities: {
    list: EntityType[]
    totalCount: number
  }
}

export type EntityListInput = {
  filter: {
    name: string
  }
  limit?: number
  skip?: number 
}

export type DeliveryMethod = {
  id: string,
  entity: string
  name: string
  description: string
  sellPrice: number
  listPrice: number
  score: number
}

export type DeliveryMethodCreateInput = {
  entity: string
  name: string
  description: string
  sellPrice: number
  listPrice: number
  score: number
}