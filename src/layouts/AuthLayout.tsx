import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores"

const AuthLayout = () => {

  const isLogged = useAuthStore(state => state.isLogged)

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default AuthLayout