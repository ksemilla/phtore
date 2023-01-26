export enum OrderStatus {
  PENDING = 1000,
  ACCEPTED = 2000,
  DELIVERY = 3000,
  COMPLETED = 4000,
  CANCELLED = 5000,
  REJECTED = 6000,
}

export enum CustomerType {
  USER = "USER",
  ENTITY = "ENTITY",
}

export type Order = {
  id: string
  customerData: {
    company?: string
    firstName: string
    lastName: string
    email: string
    mobile: string
  }
  customerType: CustomerType
  customer: string
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
  orderItems: OrderItem[]
  status: OrderStatus
}

export type OrderItem = {
  uuid?: string
  product: string
  sellPrice: number
  listPrice: number
  quantity: number
}

export type OrderCreateInput = {
  entity: string
  customer: string
  customerType: CustomerType
  customerData: {
    company?: string
    firstName: string
    lastName: string
    email: string
    mobile: string
  }
  shippingFee: number
  billingInfo: {
    company?: string
    address1: string
    address2: string
    suburb: string
    city: string
    state: string
    zipCode: string
  }
  shippingSameAsBilling: boolean
  shippingInfo: {
    company?: string
    address1: string
    address2: string
    suburb: string
    city: string
    state: string
    zipCode: string
  }
  orderItems: [OrderItem, ...OrderItem[]]
  status: OrderStatus
}
