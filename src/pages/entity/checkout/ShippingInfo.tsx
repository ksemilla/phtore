import ShippingInfoForm from "@/forms/utils/ShippingInfoForm"
import useFormElements from "@/hooks/hookForm/useFormElements"
import { Order } from "@/types"
import { useFormContext } from "react-hook-form"

const ShippingInfo = () => {
  const { watch } = useFormContext<Order>()
  const showShipping = !watch("shippingSameAsBilling")
  const { CheckboxInput } = useFormElements<Order>()

  return (
    <>
      <div className="flex items-center space-x-6">
        <h1 className="text-lg">Shipping Address</h1>
        <div className="flex items-center space-x-2">
          <CheckboxInput
            name="shippingSameAsBilling"
            label="Same as billing address"
          />
        </div>
      </div>
      {showShipping && <ShippingInfoForm />}
    </>
  )
}

export default ShippingInfo
