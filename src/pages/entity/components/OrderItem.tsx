import { useQueryProduct } from "@/api"
import Img from "@/components/elements/Img"
import Input from "@/components/elements/Input"
import useCartStore from "@/stores/cart"
import { OrderItem as OrderItemType } from "@/types/orders"
import { XMarkIcon } from "@heroicons/react/24/outline"

type OrderItemProps = {
  idx: number
  orderItem: OrderItemType
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderItem = (props: OrderItemProps) => {

  const setOrder = useCartStore(state => state.setOrder)
  const order = useCartStore(state => state.order)
  const {orderItem, idx, setShow} = props
  const {data} = useQueryProduct(orderItem.product)

  return (
    <div className="flex space-x-3">
      <div className="w-32 rounded-md overflow-hidden">
        <Img
          src={data?.product.photoData.url}
        />
      </div>
      <div className="flex flex-1 justify-between">
        <div className="py-1">
          <h1 className="text-gray-800">{data?.product.name}</h1>
          <div className="flex items-center space-x-1 text-gray-600">
            <p>&#8369;</p>
            <span>{orderItem.sellPrice}</span>
          </div>
        </div>
        <div className="inline space-x-2">
          <span>Qty</span>
          <Input
            type="number"
            id="visible-arrow"
            min="1"
            value={orderItem.quantity}
            onChange={e=>{
              setOrder({
                ...order,
                items: order.items.map((item, i) => {
                  if (i !== idx) {
                    return item
                  } else {
                    return {
                      ...item,
                      quantity: parseInt(e.target.value)
                    }
                  }
                })
              })
            }}
            className="w-24 inline"
          />
        </div>
        <div>
          <XMarkIcon
            className="w-5 cursor-pointer hover:text-red-500"
            onClick={()=>{
              setOrder({
                ...order,
                items: order.items.filter((_, i) => i !== idx)
              })
              if (order.items.length <= 1) setShow(false)
            }}
            />
        </div>
      </div>
    </div>
  )
}

export default OrderItem