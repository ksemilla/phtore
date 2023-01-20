import useFormElements from "@/hooks/hookForm/useFormElements"
import { Order } from "@/types"

const ContactInfo = () => {

  const { TextInput } = useFormElements<Order>()

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="md:col-span-3">
        <TextInput
          name="firstName"
          label="First Name"
          rules={{
            required: true
          }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="lastName"
          label="Last Name"
          rules={{
            required: true
          }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="email"
          label="Email"
          rules={{
            required: true
          }}
        />
      </div>
      <div className="md:col-span-3">
        <TextInput
          name="mobile"
          label="Mobile number"
          rules={{
            required: true
          }}
        />
      </div>
    </div>
  )
}

export default ContactInfo