import Form from "@/hooks/hookForm"
import useFormElements from "@/hooks/hookForm/useFormElements"
import { DeliveryMethod } from "@/types"
import { SubmitHandler } from "react-hook-form"

type DeliveryMethodFormProps = {
  onSubmit: SubmitHandler<DeliveryMethod>
  defaultValues?: DeliveryMethod
}

const DeliveryMethodForm = (props: DeliveryMethodFormProps) => {
  const { onSubmit, defaultValues } = props

  const { TextInput, NumberInput } = useFormElements<DeliveryMethod>()

  return (
    <Form<DeliveryMethod>
      id="delivery-method-form"
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <TextInput
            name="name"
            label="Name"
            rules={{
              required: true,
            }}
          />
        </div>
        <div className="col-span-12">
          <TextInput
            name="description"
            label="Description"
            rules={{
              required: true,
            }}
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <NumberInput
            name="sellPrice"
            label="Sell Price"
            rules={{
              required: true,
              min: {
                value: 0,
                message: "Minimum of 0",
              },
            }}
            visibleArrows
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <NumberInput
            name="listPrice"
            label="List Price"
            rules={{
              required: true,
              min: {
                value: 0,
                message: "Minimum of 0",
              },
            }}
            visibleArrows
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <NumberInput
            name="score"
            label="Score"
            rules={{
              required: true,
              min: {
                value: 0,
                message: "Minimum of 0",
              },
            }}
            visibleArrows
          />
        </div>
      </div>
    </Form>
  )
}

export default DeliveryMethodForm
