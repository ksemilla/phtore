import { useQueryProduct } from "@/api"
import Img from "@/components/elements/Img"
import Input from "@/components/elements/Input"
import { useEntityStore } from "@/stores"
import useCartStore from "@/stores/cart"
import { OrderItem as OrderItemType } from "@/types/orders"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

type OrderItemProps = {
  idx: number
  orderItem: OrderItemType
}

const OrderItem = (props: OrderItemProps) => {
  const setOrder = useCartStore((state) => state.setOrder)
  const order = useCartStore((state) => state.order)
  const { orderItem, idx } = props
  const { data } = useQueryProduct(orderItem.product)
  const navigate = useNavigate()
  const entity = useEntityStore((state) => state.entity)

  return (
    <div className="p-4 flex justify-between space-x-4">
      <div className="w-32 rounded-md overflow-hidden">
        <Img src={data?.product.photoData.url} />
      </div>
      <div>
        <h1 className="text-lg text-gray-700">{data?.product.name}</h1>
        <p className="text-gray-500">&#8369; {data?.product.sellPrice}</p>
      </div>
      <div>
        <Input
          type="number"
          id="visible-arrow"
          min="1"
          value={orderItem.quantity}
          onChange={(e) => {
            setOrder({
              ...order,
              orderItems: order.orderItems.map((item, i) => {
                if (i !== idx) {
                  return item
                } else {
                  return {
                    ...item,
                    quantity: parseInt(e.target.value),
                  }
                }
              }),
            })
          }}
          className="w-24 inline rounded-md shadow-sm sm:text-sm border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <XMarkIcon
          className="w-5 cursor-pointer hover:text-red-500"
          onClick={() => {
            setOrder({
              ...order,
              orderItems: order.orderItems.filter((_, i) => i !== idx),
            })
            if (order.orderItems.length <= 1) navigate(`/${entity?.slug}`)
          }}
        />
      </div>
    </div>
  )
}

export default OrderItem
