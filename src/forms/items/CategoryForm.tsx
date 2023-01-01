import { ItemType } from "@/types"
import { useFieldArray, useFormContext } from "react-hook-form"
import ChoiceForm from "./ChoiceForm"
import { TrashIcon } from "@heroicons/react/24/outline"
import Input from "@/components/elements/Input"

const CategoryForm = (props: { idx: number, removeCategory: (catIdx: number) => void }) => {
  const {idx, removeCategory} = props

  const { register, control, formState: { errors } } = useFormContext<ItemType>()
  const {fields: choices, append, remove} = useFieldArray({
    control,
    name: `categories.${idx}.choices`,
    keyName: "uuid"
  })

  return (
    <div className="col-span-6 md:col-span-2 border">
      <div className="p-4">
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
          hasError={errors.categories?.[idx]?.name ? true : false}
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
              className="block text-gray-500 hover:text-gray-800"
            >+ Choice</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryForm