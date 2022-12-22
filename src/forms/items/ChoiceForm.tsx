import Input from "@/components/elements/Input"
import { ItemType } from "@/types"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { UseFieldArrayRemove, useFormContext } from "react-hook-form"

const ChoiceForm = (props: { parentIdx: number, idx: number, removeChoice: UseFieldArrayRemove }) => {

  const { idx, parentIdx, removeChoice } = props
  const { register } = useFormContext<ItemType>()

  return (
    <div className="flex items-center space-x-1">
      <div>{idx + 1}</div>
      <Input
        type="text"
        {...register(`categories.${parentIdx}.choices.${idx}.name`, { required: true })}
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