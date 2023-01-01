import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import ShippingInfoForm from "@/forms/utils/ShippingInfoForm"
import useCartStore from "@/stores/cart"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

const Checkout = () => {

  const order = useCartStore(state=>state.order)

  return (
    <div className="max-w-6xl m-auto bg-gray-50 grid grid-cols-6 gap-4">
      <div className="col-span-3 p-4 divide-y divide-gray-200 space-y-4">
        <div className="space-y-4 pb-4">
          <h1 className="text-lg">Contact Information</h1>
          <div className="grid grid-cols-6 gap-4">
            <div className="md:col-span-3">
              <Label>First Name</Label>
              <Input
                type="text"

              />
            </div>
            <div className="md:col-span-3">
              <Label>Last Name</Label>
              <Input
                type="text"

              />
            </div>
            <div className="md:col-span-3">
              <Label>Email</Label>
              <Input
                type="text"

              />
            </div>
            <div className="md:col-span-3">
              <Label>Mobile</Label>
              <Input
                type="text"
                
              />
            </div>
          </div>
        </div>
        <div className="py-4 space-y-4">
          <h1 className="text-lg">Billing Address</h1>
          <ShippingInfoForm />
        </div>
        <div className="py-4 space-y-4">
          <h1 className="text-lg">Shipping Address</h1>
          <div className="flex items-center space-x-2 py-2">
            <Input
              type="checkbox"
              className="block h-4 w-4"
            />
            <Label>Same as billing address</Label>
          </div>
        </div>
        <div className="py-4 space-y-4">
          <h1 className="text-lg">Delivery Method</h1>
          <div className="flex items-center space-x-4 py-2">
            <div className="w-64 p-3 space-y-8 rounded-md shadow-sm bg-white border-2 border-indigo-500 ring-indigo-500">
              <div>
                <div className="flex justify-between">
                  <h1 className="font-medium">Standard</h1>
                  <CheckCircleIcon className="w-4 text-indigo-500"/>
                </div>
                <p className="text-sm text-gray-600">4-10 business days</p>
              </div>
              <p className="">&#8369; 50.00</p>
            </div>
            <div className="w-64 p-3 space-y-8 rounded-md shadow-sm bg-white border border-gray-200 ring-indigo-500">
              <div>
                <div className="flex justify-between">
                  <h1 className="font-medium">Express</h1>
                  {/* <CheckCircleIcon className="w-4 text-indigo-500"/> */}
                </div>
                <p className="text-sm text-gray-600">2-5 business days</p>
              </div>
              <p className="">&#8369; 100.00</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 col-span-3">
        <h1 className="text-lg">Order Summary</h1>
      </div>
    </div>
  )
}

export default Checkout