import useFormElements from "@/hooks/hookForm/useFormElements"
import { Order } from "@/types"

const BillingInfoForm = () => {
  const { TextInput } = useFormElements<Order>()

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="md:col-span-12">
        <TextInput name="billingInfo.company" label="Company" />
      </div>
      <div className="md:col-span-6">
        <TextInput
          name="billingInfo.address1"
          label="Address 1"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-6">
        <TextInput
          name="billingInfo.address2"
          label="Address 2"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="billingInfo.suburb"
          label="Brgy"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="billingInfo.city"
          label="City"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="billingInfo.state"
          label="Province"
          rules={{ required: true }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput name="billingInfo.zipCode" label="Postal" />
      </div>
    </div>
  )
}

export default BillingInfoForm
