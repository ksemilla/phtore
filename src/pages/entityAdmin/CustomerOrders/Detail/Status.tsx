import Select from "@/components/elements/Select"
import { Order, OrderStatus } from "@/types"
import { enumToObject } from "@/utils"
import { DeepPartial, useForm } from "react-hook-form"

const Status = ({ defaultValues }: { defaultValues: DeepPartial<Order> }) => {
  const orderStatusObject = enumToObject(OrderStatus)
  const { register } = useForm<Order>({
    defaultValues,
  })
  return (
    <form>
      <Select {...register("status")}>
        {Object.entries(orderStatusObject).map(([key, value]) => (
          <option key={value}>{key}</option>
        ))}
      </Select>
    </form>
  )
}

export default Status
