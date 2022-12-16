import Spinner from "@/components/Spinner"
import { ProductType, ProductTypeEnum } from "@/types"
import { classNames, dirtyValues } from "@/utils"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

type ProductCreateFormProps = {
  loading: boolean
  defaultValues?: ProductType
  onSubmit: (formValues: ProductType) => void
}

const ProductCreateForm = (props: ProductCreateFormProps) => {
  const { loading, defaultValues, onSubmit: onSubmitProp } = props

  const { register, reset, handleSubmit, formState: { errors, isDirty, dirtyFields } } = useForm<ProductType>({
    defaultValues
  })

  useEffect(()=>{
    reset(defaultValues)
  }, [defaultValues])

  const onSubmit = handleSubmit((formValues)=>{
    const dirtyFormValues = dirtyValues(dirtyFields, formValues) as ProductType
    onSubmitProp(dirtyFormValues)
  })

  return (
    <form onSubmit={onSubmit}>
      <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Code
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                {...register('code', { required: true })}
                className={classNames(
                  "w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.code ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
              />
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.code?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                {...register('name', { required: true })}
                className={classNames(
                  "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.name ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
              />
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.name?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                {...register('quantity', { required: true, setValueAs: val => parseFloat(val) })}
                className={classNames(
                  "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.quantity ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
                defaultValue={0}
                min="0"
                step="0.01"
              />
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.quantity?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <select
                {...register("type")}
                className={classNames(
                  "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.type ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
              >
                {Object.entries(ProductTypeEnum).map(([key]) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.type?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Sell price
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                {...register('sellPrice', { required: true, setValueAs: val => parseFloat(val) })}
                className={classNames(
                  "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.sellPrice ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
                defaultValue={0}
                min="0"
                step="0.01"
              />
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.sellPrice?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            List price
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                {...register('listPrice', { required: true, setValueAs: val => parseFloat(val) })}
                className={classNames(
                  "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm disabled:text-gray-500",
                  errors?.listPrice ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
                defaultValue={0}
                min="0"
                step="0.01"
              />
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.listPrice?.type === "required" && "This field is required"}</p>
            </div>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            About
          </label>
          <div className="mt-1">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              defaultValue={''}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Write a few sentences about this store</p>
        </div>
        <button
          disabled={loading || !isDirty}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500 disabled:bg-gray-500"
        >{loading ? <Spinner /> : "Submit"}</button>
      </div>
    </form>
  )
}

export default ProductCreateForm