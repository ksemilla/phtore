import { Outlet } from "react-router-dom"
import { useAuthStore } from "../stores"

const AuthLayout = () => {

  const isLogged = useAuthStore(state => state.isLogged)

  return <Outlet />
}

export default AuthLayout