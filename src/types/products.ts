export enum ProductTypeEnum {
  STOCK = "stock",
  LABOR = "labor",
  DOCUMENT = "document",
  ASSEMBLY = "assembly"
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
  sell_price: number
  list_price: number
}