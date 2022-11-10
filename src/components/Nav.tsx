import { useAuthStore } from "@/stores"
import { Bars3Icon } from "@heroicons/react/24/solid"
import { ShoppingBagIcon} from "@heroicons/react/24/outline"
import LoginPopover from "./LoginPopover"

const Nav = () => {

  const isLogged = useAuthStore(state => state.isLogged)

  return <nav className="absolute top-0 left-0 right-0">
    <div className="flex justify-between items-center p-2">
      <span>PHTORE</span>
      <div className="flex items-center divide-x-2 divide-gray-400">
        <span className="px-3">
          {isLogged ? <Bars3Icon className="h-4 w-4"/> : <LoginPopover />}   
        </span>
        <span className="px-3 flex items-center space-x-2"><ShoppingBagIcon className="h-6 w-6 text-gray-700"/><span>0</span></span>
      </div>
    </div>
  </nav>
}

export default Nav