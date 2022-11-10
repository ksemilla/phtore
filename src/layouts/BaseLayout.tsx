import { Outlet } from "react-router-dom"
import Nav from "@/components/Nav"

const BaseLayout = () => {
  return <>
    <Nav />
    <Outlet />  
  </>
}

export default BaseLayout