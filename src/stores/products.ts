import { GET_PRODUCT } from '@/api'
import { useQuery } from '@apollo/client'
import create from 'zustand'
import { ProductType } from '../types'

interface ProductStoreState {
  products: Record<string, ProductType>,
  setProduct: (val: ProductType) => void,
  getProduct: (id: string) => ProductType | undefined | null,
}

const useProductStore = create<ProductStoreState>()((set, get) => ({
  products: {},
  setProduct: (product: ProductType) => set((state) => ({ ...state, [product.id]: product })),
  getProduct: (id: string) => {
    if (id in get().products) {
      return get().products[id]
    } else {
      const {loading, data, error} = useQuery<{ product: ProductType }>(GET_PRODUCT, { variables: { id }, fetchPolicy: "no-cache" })
      if (data) set((state) => ({...state, products: {...state.products, [id]: data.product}}))
      return data?.product
    }
  },
}))

export default useProductStore