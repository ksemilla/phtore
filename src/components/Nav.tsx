import { useAuthStore } from "@/stores"
import LoginPopover from "./LoginPopover"
import { useNavigate } from "react-router-dom"
import CreateAccountPopover from "./CreateAccountPopover"
import Spinner from "./Spinner"
import MenuDropdown from "./MenuDropdown"

type NavProps = {
  display?: 'absolute' | 'block'
}

const Nav = (props: NavProps) => {

  const isLogged = useAuthStore(state => state.isLogged)
  const verifyingToken = useAuthStore(state => state.verifyingToken)
  const navigate = useNavigate()

  return <nav className={`${props.display ?? "absolute"} top-0 left-0 right-0 p-2`}>
    <div className="flex justify-between items-center p-2">
      <span className="cursor-pointer" onClick={()=>navigate("/")}>PHTORE</span>
      <div className="flex items-center">
        {verifyingToken ? <Spinner color="text-gray-700"/> : <>
          <span className="px-3">
            {isLogged && <MenuDropdown />}
            {!isLogged && <LoginPopover />}   
          </span>
          {/* <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> */}
          {!isLogged && <CreateAccountPopover />}
        </>}
        {/* <span className="px-3 flex items-center space-x-2"><ShoppingBagIcon className="h-6 w-6 text-gray-400"/><span>0</span></span> */}
      </div>
    </div>
  </nav>
}

export default Nav