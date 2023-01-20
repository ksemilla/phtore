import { useQueryDeliveryMethodList } from "@/api"
import { useEntityStore } from "@/stores"
import { DeliveryMethod, Order } from "@/types"
import { classNames, logError } from "@/utils"
import { ApolloError } from "@apollo/client"
import { useEffect, useState } from "react"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { useFormContext } from "react-hook-form"

type DeliveryMethodCardProps = {
  deliveryMethod: DeliveryMethod,
  selected: boolean
  setSelected: React.Dispatch<React.SetStateAction<string>>
}

const DeliveryMethodCard = (props: DeliveryMethodCardProps) => {

  const { setValue } = useFormContext<Order>()
  const { deliveryMethod, selected, setSelected } = props

  return (
    <div
      className={classNames(
        "p-3 space-y-8 rounded-md cursor-pointer shadow-sm bg-white ring-indigo-500",
        selected ? "border-2 border-indigo-500" : "border border-gray-200 hover:border-blue-400"
      )}
      onClick={()=>{
        setSelected(deliveryMethod.id)
        setValue("shippingFee", deliveryMethod.sellPrice)
      }}
    >
      <div>
        <div className="flex justify-between">
          <h1 className="font-medium">{deliveryMethod.name}</h1>
          {selected && <CheckCircleIcon className="w-4 text-indigo-500"/>}
        </div>
        <p className="text-sm text-gray-600">{deliveryMethod.description}</p>
      </div>
      <p className="">&#8369; {deliveryMethod.sellPrice}</p>
    </div>
  )
}

const DeliveryMethods = () => {

  const deliveryMethods = useEntityStore(state=>state.deliveryMethods)
  const [selected, setSelected] = useState<string>("")
  const { register } = useFormContext<Order>()

  useEffect(()=>{
    setSelected(deliveryMethods?.[0]?.id ?? "")
  }, [deliveryMethods])

  useEffect(()=>{
    register("shippingFee")
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4">
      {deliveryMethods.map(deliveryMethod => (
        <DeliveryMethodCard
          key={deliveryMethod.name}
          deliveryMethod={deliveryMethod}
          selected={selected === deliveryMethod.id}
          setSelected={setSelected}
        />
      ))}
    </div>
  )
}

export default DeliveryMethods