import create from 'zustand'
import { UserType } from '../types'

interface AuthState {
  isLogged: boolean,
  user: UserType | null,
  login: (user: UserType) => void,
  verifyingToken: boolean,
  setVerifyingToken: (data: boolean) => void,
  logout: () => void,
  setUser: (data: UserType) => void,
}

const useAuthStore = create<AuthState>()((set) => ({
  isLogged: false,
  user: null,
  verifyingToken: false,
  setIsLogged: (data: boolean) => set((state) => ({ ...state, isLogged: data })),
  setUser: (user: UserType) => set((state) => ({...state, user})),
  logout: () => set((state) => ({...state, isLogged: false, user: null})),
  login: (user: UserType) => set((state) => ({...state, user, isLogged: true})),
  setVerifyingToken: (data: boolean) => set((state) => ({ ...state, verifyingToken: data })),
}))

export default useAuthStore