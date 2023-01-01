import { ItemCategoryType, ItemType } from "@/types"
import { makeUniqueId } from "@apollo/client/utilities"
import { FieldArrayWithId, useFieldArray, useFormContext, useWatch } from "react-hook-form"
import InstanceForm from "./InstanceForm"


const Instances = () => {

  const { control } = useFormContext<ItemType>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "instances",
    keyName: "uuid"
  })

  const categories: FieldArrayWithId<ItemType, "categories", "uuid">[] = (useWatch({ name: "categories" }) ?? []).map((item: ItemCategoryType) => ({...item, uuid: makeUniqueId("cat")}))
  
  return (
    <div className="space-y-2 p-4 sm:px-0 ">
      <h1 className="text-lg font-medium leading-6 text-gray-900">Instances</h1>

      <div className="space-y-2">
        {categories.length > 0 && <div className="flex items-center space-x-2">
          <div className="w-8">#</div>
          <div className="w-full grid grid-cols-12 gap-x-2">
            {categories?.map((category) => (
              <div key={category.uuid} className="col-span-2">
                <label>{category.name}</label>
              </div>
            ))}
          </div>
        </div>}

        {fields.map((instance, idx) => (
          <InstanceForm
            key={instance.uuid}
            idx={idx}
            removeInstance={remove}
          />
        ))}

        <button
          type="button"
          className="block text-gray-500 hover:text-gray-800"
          onClick={()=>{
            append({
              attributes: categories.map((cat) => ({ name: cat.name, value: "" })),
              product: {
                name: "",
                id: ""
              }
            })
          }}
        >
          + Instance
        </button>
      </div>
    </div>
  )
}

export default Instances