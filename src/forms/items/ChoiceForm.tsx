import { ItemCategoryChoiceType, ItemType } from "@/types"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { UseFieldArrayRemove, useFormContext } from "react-hook-form"

const ChoiceForm = (props: { parentIdx: number, idx: number, choice: ItemCategoryChoiceType, removeChoice: UseFieldArrayRemove }) => {

  const { idx, choice, parentIdx, removeChoice } = props
  const { register } = useFormContext<ItemType>()

  return (
    <div className="flex items-center space-x-1">
      <div>{idx + 1}</div>
      <input
        type="text"
        {...register(`categories.${parentIdx}.choices.${idx}.name`, { required: true })}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <button
        type="button"
        className="hover:text-red-500"
        onClick={()=>removeChoice(idx)}
      ><XMarkIcon className="h-4"/></button>
    </div>
  )
}

export default ChoiceForm