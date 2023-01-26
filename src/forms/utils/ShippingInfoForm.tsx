import useFormElements from "@/hooks/hookForm/useFormElements"
import { Order } from "@/types"

const ShippingInfoForm = () => {
  const { TextInput } = useFormElements<Order>()

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-12">
        <TextInput name="shippingInfo.company" label="Company" />
      </div>
      <div className="md:col-span-6">
        <TextInput
          name="shippingInfo.address1"
          label="Address 1"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-6">
        <TextInput
          name="shippingInfo.address2"
          label="Address 2"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="shippingInfo.suburb"
          label="Brgy"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="shippingInfo.city"
          label="City"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="shippingInfo.state"
          label="Province"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput name="shippingInfo.zipCode" label="Postal" />
      </div>
    </div>
  )
}

export default ShippingInfoForm
