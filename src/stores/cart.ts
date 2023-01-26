import { Order, OrderItem } from "@/types/orders"
import create from "zustand"

interface CartStoreType {
  order: Order
  setOrder: (val: Order) => void
  addOrderItem: (val: OrderItem) => void
}

const useCartStore = create<CartStoreType>()((set) => ({
  order: {
    id: "",
    entity: "",
    orderItems: [],

    firstName: "",
    lastName: "",
    mobile: "",
    email: "",

    shippingFee: 0,

    billingInfo: {
      company: "",
      address1: "",
      address2: "",
      city: "",
      suburb: "",
      state: "",
      zipCode: "",
    },
    shippingSameAsBilling: false,
    shippingInfo: {
      company: "",
      address1: "",
      address2: "",
      city: "",
      suburb: "",
      state: "",
      zipCode: "",
    },
  },
  setOrder: (order: Order) => set((state) => ({ ...state, order })),
  addOrderItem: (orderItem: OrderItem) =>
    set((state) => ({
      ...state,
      order: {
        ...state.order,
        orderItems: [...state.order.orderItems, orderItem],
      },
    })),
}))

export default useCartStore
