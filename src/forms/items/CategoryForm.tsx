import { ItemType } from "@/types"
import { useFieldArray, UseFieldArrayRemove, useFormContext } from "react-hook-form"
import ChoiceForm from "./ChoiceForm"
import { TrashIcon } from "@heroicons/react/24/outline"
import Card from "@/components/Card"
import Input from "@/components/elements/Input"

const CategoryForm = (props: { idx: number, removeCategory: UseFieldArrayRemove }) => {
  const {idx, removeCategory} = props

  const { register, control } = useFormContext<ItemType>()
  const {fields: choices, append, remove} = useFieldArray({
    control,
    name: `categories.${idx}.choices`,
    keyName: "uuid"
  })

  return (
    <div className="col-span-2">
      <Card tilt={false} noCursorPointer>
        <div className="p-4 box-border">
          <div className="flex justify-between p-1">
            <label
              htmlFor="item-name" className="block text-sm font-medium text-gray-700"
            >Category {idx + 1}</label>
            <div>
              <button
                  type="button"
                  className="hover:text-red-500"
                  onClick={()=>removeCategory(idx)}
                ><TrashIcon className="h-5"/></button>
            </div>
          </div>
          <Input
            type="text"
            {...register(`categories.${idx}.name`, { required: true })}
          />
          <div className="py-1">
            <div className="space-y-1">
              {choices.map((choice, nestedIdx) => (
                <ChoiceForm
                  key={choice.uuid}
                  parentIdx={idx}
                  idx={nestedIdx}
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
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500"
              >Add choice</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CategoryForm