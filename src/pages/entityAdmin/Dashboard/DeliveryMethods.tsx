import { useDeliveryMethodCreate, useQueryDeliveryMethodList } from "@/api"
import Modal from "@/components/Modal"
import DeliveryMethodForm from "@/forms/utils/DeliveryMethodForm"
import { useEntityStore } from "@/stores"
import { DeliveryMethod as DeliveryMethodType } from "@/types"
import { logError } from "@/utils"
import { ApolloError } from "@apollo/client"
import { PlusIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import DeliveryMethod from "./DeliveryMethod"

const DeliveryMethods = () => {
  const [getDeliveryMethods] = useQueryDeliveryMethodList()
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethodType[]>([])
  const entity = useEntityStore(state=>state.entity)
  const [open, setOpen] = useState<boolean>(false)
  const [createDeliveryMethod, { loading }] = useDeliveryMethodCreate()

  const onSubmit = async (data: DeliveryMethodType ) => {
    const newData = {...data, entity: entity?.id ?? ""}
    try {
      const res = await createDeliveryMethod({variables: { input: newData }})
      setDeliveryMethods(prevState => [...prevState, {
        ...newData,
        id: res.data?.createDeliveryMethod.insertedId ?? "", 
      }])
    } catch(e) {
      logError(e as ApolloError)
    }
  }

  useEffect(()=>{

    const getQuery = async () => {
      try {
        const res = await getDeliveryMethods({ variables: { filter: { entity: entity?.id ?? "" } } })
        setDeliveryMethods(res.data?.deliveryMethods?.list ?? [])
      } catch(e) {
        logError(e as ApolloError)
      }
    }

    getQuery()

  }, [entity?.id])

  return (
    <div className="px-4 py-5 sm:px-6">
      <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900 flex items-center space-x-1">
        <span>Delivery Methods</span><span><PlusIcon className="w-5 cursor-pointer hover:text-blue-500" onClick={()=>setOpen(!open)}/></span> 
      </h2>
      <div className="grid grid-cols-6 gap-4 py-2">
        {deliveryMethods.map(deliveryMethod => (
          <DeliveryMethod
            key={deliveryMethod.id}
            deliveryMethod={deliveryMethod}
          />
        ))}
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        onAcceptForm="delivery-method-form"
      >
        <h1 className="text-lg font-medium py-2 text-center">Create delivery method</h1>
        <DeliveryMethodForm
          onSubmit={onSubmit}
        />
      </Modal>
    </div>
  )
}

export default DeliveryMethods