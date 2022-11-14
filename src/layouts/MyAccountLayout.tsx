import { Navigate, Outlet } from "react-router-dom"
import Nav from "@/components/Nav"
import { useAuthStore } from "@/stores"

const MyAccountLayout = () => {

  const isLogged = useAuthStore(state => state.isLogged)

  if (!isLogged) {
    return <Navigate to="/" />
  }

  return <>
    <Nav display="block"/>
    <Outlet />  
  </>
}

export default MyAccountLayout