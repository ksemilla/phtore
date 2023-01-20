import CustomerForm from "@/forms/customers/CustomerForm"
import { Customer } from "@/types"

const Customers = () => {

  const onSubmit = (data: Customer) => {
    console.log("data", data)
  }

  return (
    <div>
      customers
      <CustomerForm
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Customers