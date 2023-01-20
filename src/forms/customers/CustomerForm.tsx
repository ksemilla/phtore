import Form from "@/hooks/hookForm"
import useFormElements from "@/hooks/hookForm/useFormElements"
import { Customer } from "@/types"
import { DeepPartial, SubmitHandler } from "react-hook-form"

type CustomerFormProps = {
  onSubmit: SubmitHandler<Customer>
  defaultValues?: DeepPartial<Customer>
}

const CustomerForm = (props: CustomerFormProps) => {

  const {onSubmit, defaultValues} = props

  const { TextInput } = useFormElements<Customer>()

  return (
    <Form<Customer>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      >
      <TextInput
        label="Name"
        name="name"
        rules={{
          required: "Name is required"
        }}
      />
      <TextInput
        label="Email"
        name="email"
        rules={{
          required: "Email is required"
        }}
      />
      <button type="submit">Save</button>
    </Form>
  )
}

export default CustomerForm