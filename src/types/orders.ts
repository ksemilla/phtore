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

  firstName: string
  lastName: string
  email: string
  mobile: string
  shippingFee: number
  billingInfo: {
    company: string
    address1: string
    address2: string
    suburb: string
    city: string
    state: string
    zipCode: string
  }
  shippingSameAsBilling: boolean
  shippingInfo: {
    company: string
    address1: string
    address2: string
    suburb: string
    city: string
    state: string
    zipCode: string
  }

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