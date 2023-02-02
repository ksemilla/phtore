import { useCreateOrder } from "@/api/order"
import BillingInfoForm from "@/forms/utils/BillingInfoForm"
import Form from "@/hooks/hookForm"
import { useAuthStore, useEntityStore } from "@/stores"
import useCartStore from "@/stores/cart"
import { CustomerType, Order } from "@/types/orders"
import { logError } from "@/utils"
import { ApolloError } from "@apollo/client"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ContactInfo from "./ContactInfo"
import DeliveryMethods from "./DeliveryMethods"
import OrderSummary from "./OrderSummary"
import ShippingInfo from "./ShippingInfo"

const Checkout = () => {
  const user = useAuthStore((state) => state.user)
  const entity = useEntityStore((state) => state.entity)
  const deliveryMethods = useEntityStore((state) => state.deliveryMethods)
  const navigate = useNavigate()
  const order = useCartStore((state) => state.order)
  const [createOrder] = useCreateOrder()

  useEffect(() => {
    if (order.orderItems.length <= 0 && entity?.slug) {
      navigate(`/${entity?.slug}`)
    }
  }, [entity?.slug])

  const onSubmit = async (data: Order) => {
    data.orderItems = order.orderItems.map(({ uuid, ...rest }) => rest)
    data.customerType = CustomerType.USER
    data.customer = user?.id ?? ""
    data.entity = entity?.id ?? ""
    try {
      const res = await createOrder({ variables: { input: data } })
    } catch (e) {
      logError(e as ApolloError)
    }
  }

  return (
    <Form<Order>
      onSubmit={onSubmit}
      defaultValues={{
        customerData: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          mobile: user?.mobile,
        },
        shippingFee: deliveryMethods?.[0]?.sellPrice ?? 0,
      }}
    >
      <div className="max-w-6xl m-auto bg-gray-50 grid grid-cols-6 gap-4">
        <div className="col-span-3 p-4 divide-y divide-gray-200 space-y-4">
          <div className="space-y-4 pb-4">
            <h1 className="text-lg">Contact Information</h1>
            <ContactInfo />
          </div>
          <div className="py-4 space-y-4">
            <h1 className="text-lg">Billing Address</h1>
            <BillingInfoForm />
          </div>
          <div className="py-4 space-y-4">
            <ShippingInfo />
          </div>
          <div className="py-4 space-y-4">
            <h1 className="text-lg">Delivery Method</h1>
            <DeliveryMethods />
          </div>
        </div>
        <div className="p-4 col-span-3">
          <h1 className="text-lg pb-4">Order Summary</h1>
          <OrderSummary />
        </div>
      </div>
    </Form>
  )
}

export default Checkout
