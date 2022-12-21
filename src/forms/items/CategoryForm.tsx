import { ItemCategoryType, ItemType } from "@/types"
import { useFieldArray, UseFieldArrayRemove, useFormContext } from "react-hook-form"
import ChoiceForm from "./ChoiceForm"
import { XMarkIcon } from "@heroicons/react/24/outline"

const CategoryForm = (props: { idx: number, category: ItemCategoryType, removeCategory: UseFieldArrayRemove }) => {
  const {idx, category, removeCategory} = props

  const { register, control } = useFormContext<ItemType>()
  const {fields: choices, append, remove} = useFieldArray({
    control,
    name: `categories.${idx}.choices`,
    keyName: "uuid"
  })

  return (
    <div className="p-2 border">
      <div>
        <label
          htmlFor="item-name" className="block text-sm font-medium text-gray-700"
        >Category {idx + 1}</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            {...register(`categories.${idx}.name`, { required: true })}
            className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            className="hover:text-red-500"
            onClick={()=>removeCategory(idx)}
          ><XMarkIcon className="h-5"/></button>
        </div>
      </div>
      <div className="py-1">
        {/* <p className="text-xs">Choices</p> */}
        <div className="space-y-1">
          {choices.map((choice, nestedIdx) => (
            <ChoiceForm
              key={choice.uuid}
              parentIdx={idx}
              idx={nestedIdx}
              choice={choice}
              removeChoice={remove}
            />
          ))}
          <button
            type="button"
            onClick={()=>{
              append({
                name: ""
              })
            }}
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500"
          >Add choice</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryForm