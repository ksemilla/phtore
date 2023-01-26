import useCartStore from "@/stores/cart"
import { Order } from "@/types"
import { useFormContext } from "react-hook-form"
import OrderItem from "./OrderItem"

const OrderSummary = () => {
  const { watch } = useFormContext<Order>()
  const shippingFee = Number(watch("shippingFee")) ?? 0
  const order = useCartStore((state) => state.order)
  const itemsTotal = order.orderItems.reduce((acc, obj) => {
    return acc + obj.sellPrice * obj.quantity
  }, 0)

  const total = itemsTotal + shippingFee

  return (
    <div className="bg-white divide-y divide-gray-200 shadow rounded-lg overflow-hidden">
      {order.orderItems.map((item, idx) => (
        <OrderItem key={item.uuid} orderItem={item} idx={idx} />
      ))}
      <div className="p-4 divide-y divide-gray-200 space-y-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">Subtotal</div>
            <div className="text-gray-800">&#8369; {total.toFixed(2)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">Shipping</div>
            <div className="text-gray-800">&#8369; {shippingFee}</div>
          </div>
        </div>
        <div className="flex justify-between py-4 text-black text-lg">
          <div>Total</div>
          <div>&#8369; {total.toFixed(2)}</div>
        </div>
      </div>
      <div className="p-4">
        <button className="bg-indigo-600 w-full rounded p-3 text-white hover:bg-indigo-700">
          Place Order
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
