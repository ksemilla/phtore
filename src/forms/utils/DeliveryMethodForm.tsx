import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import { DeliveryMethod } from "@/types"
import { useForm } from "react-hook-form"

type DeliveryMethodFormProps = {
  onSubmit: (val: DeliveryMethod) => void
  defaultValues?: DeliveryMethod
}

const DeliveryMethodForm = (props: DeliveryMethodFormProps) => {

  const { onSubmit: onSubmitProps, defaultValues } = props
  const {register, handleSubmit} = useForm<DeliveryMethod>({
    defaultValues
  })

  const onSubmit = handleSubmit((data) => {
    onSubmitProps(data)
  })

  return (
    <form id="delivery-method-form" onSubmit={onSubmit}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <Label>Name</Label>
          <Input
            type="text"
            {...register("name", { required: true })}
          />
        </div>
        <div className="col-span-12">
          <Label>Description</Label>
          <Input
            type="text"
            {...register("description", { required: true })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Label>Sell Price</Label>
          <Input
            id="visible-arrow"
            type="number"
            min={0}
            defaultValue="0"
            {...register("sellPrice", { required: true })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Label>List Price</Label>
          <Input
            id="visible-arrow"
            type="number"
            min={0}
            defaultValue="0"
            {...register("listPrice", { required: true })}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Label>Score</Label>
          <Input
            id="visible-arrow"
            type="number"
            min={0}
            defaultValue="0"
            {...register("score", { required: true })}
          />
        </div>
      </div>
    </form>
  )
}

export default DeliveryMethodForm