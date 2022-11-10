import create from 'zustand'
import { UserType } from '../types'

interface AuthState {
  isLogged: boolean,
  user: UserType | null,
  login: (user: UserType) => void,
}

const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  user: null,
  setIsLogged: (data: boolean) => set((state) => ({ ...state, isLogged: data })),
  setUser: (user: UserType) => set((state) => ({...state, user})),
  logout: () => set((state) => ({...state, isLogged: false, user: null})),
  login: (user: UserType) => set((state) => ({...state, user, isLogged: true}))
}))

export default useAuthStore