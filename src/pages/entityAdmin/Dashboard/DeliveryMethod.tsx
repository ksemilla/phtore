import { DeliveryMethod as DeliveryMethodType } from "@/types"

type DeliveryMethodProps = {
  deliveryMethod: DeliveryMethodType
}

const DeliveryMethod = (props: DeliveryMethodProps) => {
  const { deliveryMethod } = props
  return (
    <div
      className="border rounded col-span-2 p-3 space-y-2 cursor-pointer hover:border-blue-300"
    >
      <div>
        <h1 className="font-medium">{deliveryMethod.name}</h1>
        <p className="text-sm text-gray-500">{deliveryMethod.description}</p>
      </div>
      <div>
        <p className="text-sm">Price: &#8369;{deliveryMethod.sellPrice}</p>
        <p className="text-sm">Cost: &#8369;{deliveryMethod.listPrice}</p>
      </div>
    </div>
  )
}

export default DeliveryMethod