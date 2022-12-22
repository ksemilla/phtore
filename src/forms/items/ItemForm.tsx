import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import { ItemType } from "@/types"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import CategoryForm from "./CategoryForm"
import Instances from "./Instances"

const ItemForm = () => {

  const methods = useForm<ItemType>({
    defaultValues: {
      instances: [
        {
          product: {
            id: '639b0ee7cbb4927eb3b20433',
            name: 'aa'
          }
        },
        {
          product: {
            id: '639b0ee7cbb4927eb3b20433',
            name: 'aa'
          }
        }
      ]
    }
  })
  const { control, register, handleSubmit, formState: { errors } } = methods
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
        <div className="space-y-2">
          <div className="px-4 py-5 sm:px-6 bg-white shadow md:rounded-lg">
            <Label htmlFor="item-name">Name</Label>
            <Input
              type="text"
              {...register("name", { required: true })}
              hasError={errors.name ? true : false}
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-lg font-medium leading-6 text-gray-900">Categories</h1>
            <div className="grid grid-cols-6 gap-3">
              {fields.map((category, idx) => (
                <CategoryForm
                  key={category.uuid}
                  idx={idx}
                  removeCategory={remove}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={()=>append({
                name: "",
                choices: []
              })}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-1 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500"
            >Add category</button>
          </div>

          <Instances />

          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500">
            Create
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ItemForm