import create from 'zustand'
import { DeliveryMethod, EntityType } from '../types'

interface EntityStoreState {
  entity: EntityType | null,
  setEntity: (entity: EntityType) => void,
  deliveryMethods: DeliveryMethod[],
  setDeliveryMethods: (val: DeliveryMethod[]) => void,
}

const useEntityStore = create<EntityStoreState>()((set) => ({
  entity: null,
  deliveryMethods: [],
  setEntity: (entity: EntityType) => set((state) => ({ ...state, entity })),
  setDeliveryMethods: (deliveryMethods: DeliveryMethod[]) => set((state) => ({...state, deliveryMethods})),
}))

export default useEntityStore