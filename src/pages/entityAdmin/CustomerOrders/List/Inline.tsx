import { Php } from "@/components"
import { Order } from "@/types"
import { classNames } from "@/utils"
import { useNavigate } from "react-router-dom"

type InlineProps = {
  order: Order
  idx: number
}

const Inline = (props: InlineProps) => {
  const { order, idx } = props
  const navigate = useNavigate()

  const itemsTotal = order.orderItems.reduce((acc, obj) => {
    return acc + obj.sellPrice * obj.quantity
  }, 0)

  const total = itemsTotal + order.shippingFee
  return (
    <tr
      className={classNames(
        idx % 2 === 0 ? "" : "bg-gray-50",
        "cursor-pointer hover:bg-gray-100"
      )}
      onClick={() => navigate(`${order.id}`)}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div className="flex items-center space-x-2">
          <div>{order.customerData.email}</div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex items-center">
        <Php />
        {total}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {order.status}
      </td>
    </tr>
  )
}

export default Inline
