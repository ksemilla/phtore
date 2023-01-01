export enum OrderStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DELIVERY = "delivery",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  REJECTED = "rejected"
}

export type Order = {
  id: string
  entity: string
  items: OrderItem[]
}

export type OrderItem = {
  uuid: string
  product: string
  sellPrice: number
  listPrice: number
  quantity: number
}