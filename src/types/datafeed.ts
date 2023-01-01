export enum Models {
  ENTITY = "ENTITY",
  PRODUCT = "PRODUCT",
  ITEM = "ITEM"
}

export type DatafeedType = {
  id: string
  url: string
  model: Models
  field: string
  objectId: string
}

export type DatafeedInput = {
  file: File
  model: Models
  field: string
  objectId: string
}