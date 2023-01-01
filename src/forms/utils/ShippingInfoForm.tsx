import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"

const ShippingInfoForm = () => {
  return (
    <form>
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-12">
          <Label>Company</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-6">
          <Label>Address 1</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-6">
          <Label>Address 2</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-3">
          <Label>Brgy</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-3">
          <Label>City</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-3">
          <Label>Province</Label>
          <Input
            type="text"
          />
        </div>
        <div className="md:col-span-3">
          <Label>Postal</Label>
          <Input
            type="text"
          />
        </div>
      </div>
    </form>
  )
}

export default ShippingInfoForm