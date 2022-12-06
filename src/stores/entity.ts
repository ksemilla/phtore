import create from 'zustand'
import { EntityType } from '../types'

interface EntityStoreState {
  entity: EntityType | null,
  setEntity: (entity: EntityType) => void,
}

const useEntityStore = create<EntityStoreState>()((set) => ({
  entity: null,
  setEntity: (entity: EntityType) => set((state) => ({ ...state, entity })),
}))

export default useEntityStore