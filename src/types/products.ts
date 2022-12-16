import { DatafeedType } from "./datafeed"

export enum ProductTypeEnum {
  STOCK = "stock",
  LABOR = "labor",
  DOCUMENT = "document"
}

export type ProductType = {
  id: string
  entity: string
  code: string
  name: string
  photo: string
  quantity: number
  type: ProductTypeEnum
  isActive: boolean
  locked: boolean
  sellPrice: number
  listPrice: number
  photoData: DatafeedType
}

export type ProductCreateInput = {
  name: string
  code: string
  quantity: number
  type: ProductTypeEnum
  sellPrice: number
  listPrice: number
}

export type ProductListInput = {
  filter: {
    entity: string
  }
  limit?: number
  skip?: number 
}

export type ProductListResult = {
  products: {
    list: ProductType[]
    totalCount: number
  }
}