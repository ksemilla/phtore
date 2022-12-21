import Input from "@/components/elements/Input"
import { ItemType } from "@/types"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import CategoryForm from "./CategoryForm"
import Instances from "./Instances"

const ItemForm = () => {

  const methods = useForm<ItemType>()
  const { control, register, handleSubmit } = methods
  const {fields, append, remove} = useFieldArray({
    control,
    name: "categories",
    keyName: "uuid"
  })

  const onSubmit = handleSubmit((data)=>{
    console.log("data submit", data)
  })

  return (
    <FormProvider {...methods} >
      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label
              htmlFor="item-name" className="block text-sm font-medium text-gray-700"
            >Name</label>
            <Input
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <h1>Categories</h1>
          {fields.map((category, idx) => (
            <CategoryForm
              key={category.uuid}
              idx={idx}
              category={category}
              removeCategory={remove}
            />
          ))}
          <button
            type="button"
            onClick={()=>append({
              name: "",
              choices: []
            })}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500"
          >Add category</button>
        </div>

        <div>
          Mapping
          <Instances />
        </div>

        <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500">
          Create
        </button>
      </form>
    </FormProvider>
  )
}

export default ItemForm