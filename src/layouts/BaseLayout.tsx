import { Outlet } from "react-router-dom"
import Nav from "@/components/Nav"

const BaseLayout = () => {
  return <div className="flex flex-col min-h-screen">
    <div>
      <Nav display="block"/>
    </div>
    <div className="flex-1">
      <Outlet />  
    </div>
  </div>
}

export default BaseLayout