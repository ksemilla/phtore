import { useEntityStore } from "@/stores"
import useCartStore from "@/stores/cart"
import { classNames } from "@/utils"
import {
  ShoppingBagIcon,
  PhoneIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

const navigation = ["All", "Bales", "Dresses"]

type NavProps = {
  setShowOrderSummary: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = (props: NavProps) => {
  const { setShowOrderSummary } = props

  const order = useCartStore((state) => state.order)
  const entity = useEntityStore((state) => state.entity)
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 py-2">
      <div className="max-w-6xl m-auto py-1">
        <div className="flex justify-between items-center ">
          <div
            className="flex space-x-2 cursor-pointer"
            onClick={() => navigate(`/${entity?.slug}`)}
          >
            <div className="aspect-video w-32 h-20 overflow-hidden rounded">
              <img
                src={entity?.bannerData.url}
                className="object-cover object-center lg:h-full w-full"
              />
            </div>
            <div className="flex items-center">
              <div>
                <h1 className="text-gray-800 text-lg hover:text-black font-medium cursor-pointer">
                  {entity?.name}
                </h1>
                <p className="text-gray-600 text-sm">General Merchandise</p>
              </div>
            </div>
          </div>
          <div className="text-gray-600 divide-x divide-gray-200 flex items-center space-x-4">
            <div className="flex">
              <div className="p-4 rounded-full cursor-pointer hover:bg-gray-100">
                <DevicePhoneMobileIcon className="w-6" />
              </div>
              <div className="p-4 rounded-full cursor-pointer hover:bg-gray-100">
                <PhoneIcon className="w-6" />
              </div>
            </div>
            <div className="pl-2">
              <button
                type="button"
                className="relative p-4 flex items-center space-x-1 rounded-full hover:text-black hover:bg-gray-100"
                onClick={() => {
                  ;(order?.orderItems.length ?? 0) > 0 &&
                    setShowOrderSummary(true)
                }}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                <div
                  className={classNames(
                    "absolute right-2 top-2 text-white rounded-full py-0.5 px-1 text-xs font-bold",
                    (order?.orderItems.length ?? 0) > 0 ? "bg-red-500" : ""
                  )}
                >
                  {order?.orderItems.length ?? 0}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
