import { FIND_PRODUCT_BY_NAME } from "@/api/products"
import { useEntityStore } from "@/stores"
import { ItemCategoryType, ItemType } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import InstanceForm from "./InstanceForm"

const Instances = () => {

  const { control } = useFormContext<ItemType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instances",
    keyName: "uuid"
  })

  const categories = useWatch({ name: "categories" })

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-medium leading-6 text-gray-900">Instances</h1>

      <div className="px-4 py-5 sm:px-6 bg-white shadow md:rounded-lg space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-8">#</div>
          <div className="w-full grid grid-cols-12 gap-x-2">
            {categories?.map((category: ItemCategoryType, idx: number) => (
              <div key={idx} className="col-span-2">
                <label>{category.name}</label>
              </div>
            ))}
          </div>
        </div>

        {fields.map((instance, idx) => (
          <InstanceForm
            key={instance.uuid}
            idx={idx}
          />
        ))}
      </div>
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