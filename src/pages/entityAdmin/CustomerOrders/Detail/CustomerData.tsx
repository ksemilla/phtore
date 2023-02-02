import useFormElements from "@/hooks/hookForm/useFormElements"
import { Order } from "@/types"

const CustomerData = () => {
  const { TextInput } = useFormElements<Order>()

  return (
    <div className="sm:p-4 space-y-2">
      <h1 className="text-lg font-medium leading-6 text-gray-900">
        Customer Data
      </h1>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <TextInput name="customer" label="Customer ID" disabled />
        </div>
        <div className="col-span-1">
          <TextInput name="customerData.firstName" label="First Name" />
        </div>
        <div className="col-span-1">
          <TextInput name="customerData.lastName" label="Last Name" />
        </div>
        <div className="col-span-1">
          <TextInput name="customerData.email" label="Email" />
        </div>
        <div className="col-span-1">
          <TextInput name="customerData.mobile" label="Mobile" />
        </div>
      </div>
    </div>
  )
}

export default CustomerData
