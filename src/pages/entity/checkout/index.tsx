import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import BillingInfoForm from "@/forms/utils/BillingInfoForm"
import ShippingInfoForm from "@/forms/utils/ShippingInfoForm"
import Form from "@/hooks/hookForm"
import useFormElements from "@/hooks/hookForm/useFormElements"
import { useEntityStore } from "@/stores"
import useCartStore from "@/stores/cart"
import { Order } from "@/types/orders"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import ContactInfo from "./ContactInfo"
import DeliveryMethods from "./DeliveryMethods"
import OrderSummary from "./OrderSummary"
import ShippingInfo from "./ShippingInfo"

const Checkout = () => {

  const entity = useEntityStore(state=>state.entity)
  const navigate = useNavigate()
  const order = useCartStore(state=>state.order)
  const deliveryMethods = useEntityStore(state=>state.deliveryMethods)
  const { CheckboxInput } = useFormElements<Order>()
  const methods = useForm<Order>({
    defaultValues: {
      shippingFee: deliveryMethods?.[0]?.sellPrice ?? 0
    }
  })

  useEffect(()=>{
    if (order.items.length <= 0 && entity?.slug) {
      navigate(`/${entity?.slug}`)
    }
  }, [entity?.slug])

  const onSubmit = (data: Order) => {
    console.log("data", data)
  }

  return (
    <Form<Order>
      onSubmit={onSubmit}
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
        </div>
      </div>
      <button type="submit">save</button>
    </Form>
  )

  return (
    <FormProvider {...methods}>
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
            <h1 className="text-lg">Shipping Address</h1>
            <div className="flex items-center space-x-2 py-2">
              <Input
                type="checkbox"
                className="block h-4 w-4 rounded-sm"
              />
              <Label>Same as billing address</Label>
            </div>
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
    </FormProvider>
  )
}

export default Checkout