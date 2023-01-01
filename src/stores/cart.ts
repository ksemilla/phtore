import { Order, OrderItem } from '@/types/orders'
import create from 'zustand'

interface CartStoreType {
  order: Order
  setOrder: (val: Order) => void
  addOrderItem: (val: OrderItem) => void
}

const useCartStore = create<CartStoreType>()((set) => ({
  order: {
    id: "",
    entity: "",
    items: []
  },
  setOrder: (order: Order) => set((state) => ({ ...state, order })),
  addOrderItem: (orderItem: OrderItem) => set((state) => ({ ...state, order: {...state.order, items: [...state.order.items, orderItem]} })),
}))

export default useCartStore