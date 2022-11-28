import { Navigate, Outlet } from "react-router-dom"
import Nav from "@/components/Nav"
import { useAuthStore } from "@/stores"

const MyStoresLayout = () => {

  const isLogged = useAuthStore(state => state.isLogged)

  if (!isLogged) {
    return <Navigate to="/" />
  }

  return <div className="min-h-screen flex flex-col">
    <Nav display="block"/>
    <div className="flex-1 bg-gray-50">
      <div className="max-w-7xl m-auto mt-1">
        <Outlet /> 
      </div>
    </div> 
  </div>
}

export default MyStoresLayout