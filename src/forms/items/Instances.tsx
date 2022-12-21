import { FIND_PRODUCT_BY_NAME } from "@/api/products"
import { useEntityStore } from "@/stores"
import { ItemCategoryType, ItemType } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import InstanceForm from "./InstanceForm"

const Instances = () => {

  const { control, register } = useFormContext<ItemType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instances",
    keyName: "uuid"
  })
  return (
    <div>
      <h1>Instances</h1>
      {fields.map((instance, idx) => (
        <InstanceForm
          key={instance.uuid}
          idx={idx}
        />
      ))}
      <button
        type="button"
        onClick={()=>{
          append({
            product: {
              name: "",
              id: ""
            }
          })
        }}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500"
      >
        Add instance
      </button>
    </div>
  )
}

export default Instances