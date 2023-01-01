import Input from "@/components/elements/Input"
import Label from "@/components/elements/Label"
import { ItemType } from "@/types"
import { classNames, dirtyValues } from "@/utils"
import { useCallback, useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import CategoryForm from "./CategoryForm"
import Instances from "./Instances"
import { PlusIcon } from "@heroicons/react/24/outline"
import Textarea from "@/components/elements/Textarea"

type ItemCreateFormProps = {
  loading: boolean
  defaultValues?: ItemType
  onSubmit: (formValues: ItemType) => void
}

const ItemForm = (props: ItemCreateFormProps) => {

  const { onSubmit: onSubmitProp, defaultValues } = props

  const methods = useForm<ItemType>({
    defaultValues
  })
  const { control, register, handleSubmit, formState: { errors, dirtyFields }, getValues, setValue, reset } = methods
  const {fields, append } = useFieldArray({
    control,
    name: "categories",
    keyName: "uuid"
  })

  const onSubmit = handleSubmit((formValues)=>{
    const dirtyFormValues = dirtyValues(dirtyFields, formValues) as ItemType
    onSubmitProp(dirtyFormValues)
  })

  useEffect(()=>{
    reset(defaultValues)
  }, [defaultValues])

  const removeCategory = useCallback((idx: number) => {
    const formValues = getValues()
    reset({
      ...formValues,
      categories: formValues.categories.filter((_, i) => idx !== i),
      instances: formValues.instances.map((inst) => ({
        ...inst,
        attributes: inst.attributes.filter((_, i) => idx !== i)
      }))
    })
  }, [])

  const appendCategory = () => {
    append({
      name: "",
      choices: []
    })
    const instances = getValues("instances")
    const newInstances = instances?.map((inst) => ({
      ...inst,
      attributes: [...inst.attributes, { name: "", value: "" }]
    }))
    setValue("instances", newInstances)
  }

  return (
    <FormProvider {...methods} >
      <button onClick={()=>console.log(getValues())} >test</button>
      <form onSubmit={onSubmit}>
        <div className="space-y-8 sm:p-4 border md:rounded-lg bg-white divide-y divide-gray-200">
          <div className="space-y-2 p-4 sm:p-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900">General Info</h1>
            <div>
              <Label htmlFor="item-name">Name</Label>
              <Input
                type="text"
                {...register("name", { required: true })}
                hasError={errors.name ? true : false}
              />
            </div>
            <div>
              <Label htmlFor="item-name">Description</Label>
              <Textarea
                {...register("description", { required: true })}
                hasError={errors.description ? true : false}
                rows={3}
              />
            </div>
          </div>
          <div className="space-y-2 p-4 sm:px-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900">Categories</h1>
            <div className="grid grid-cols-6 gap-3">
              {fields.map((category, idx) => (
                <CategoryForm
                  key={category.uuid}
                  idx={idx}
                  removeCategory={removeCategory}
                />
              ))}
              <div
                className={classNames(
                  "col-span-2 p-4 rounded-lg border-2 border-dashed cursor-pointer text-gray-500 hover:border-gray-700 hover:text-gray-700 flex flex-col justify-center"
                )}
                onClick={()=>{
                  appendCategory()
                }}
              >
                <PlusIcon className="h-20"/>
                <p className="text-center">Add category</p>
              </div>
            </div>
          </div>

          <Instances />

          <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500">
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default ItemForm