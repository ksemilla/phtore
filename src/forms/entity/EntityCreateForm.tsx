import { FIND_ENTITY_BY_SLUG } from "@/api"
import Spinner from "@/components/Spinner"
import { EntityType } from "@/types"
import { classNames, useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

type EntityCreateFormProps = {
  loading: boolean
  defaultValues?: EntityType
  onSubmit: (formValues: EntityType) => void
}

type EntityCreateFormValues = {
  nameCheck: string
  name: string
}

const EntityCreateForm: React.FC<EntityCreateFormProps> = ({ loading: loadingProps, defaultValues, onSubmit: onSubmitProp }) => {

  const [delayedSearch, searchQuery, setSearchQuery] = useSearchDebounce(1000)
  const [isValidName, setIsValidName] = useState<boolean>(false) 
  const { loading, data } = useQuery<{ findEntityBySlug: {id: string, name: string, slug: string} }, { slug: string }>(FIND_ENTITY_BY_SLUG, {variables: { slug: delayedSearch.replaceAll(" ", "-").toLowerCase() }, skip: delayedSearch === ""})

  const { register, handleSubmit, formState: { errors, isDirty }, setError, setFocus, clearErrors } = useForm<EntityCreateFormValues>({
    defaultValues,
    mode: "onBlur"
  })

  useEffect(()=>{
    console.log(data)
    if (data && data.findEntityBySlug.id !== "" && !defaultValues) {
      setError('nameCheck', { type: 'nameCheck', message: 'Name is already taken' }, {shouldFocus: true})
      setIsValidName(false)
    } else {
      setIsValidName(true)
      clearErrors('nameCheck')
    }
  }, [data])

  useEffect(()=>{
    if (searchQuery === "") {
      clearErrors('nameCheck')
    }
  }, [searchQuery])

  const onError: SubmitErrorHandler<EntityCreateFormValues> = (errors, _e) => {
    if (errors.nameCheck) {
      setFocus('name')
    }
  }

  const onSubmit = handleSubmit((formValues) => {
    const newData = formValues as unknown as EntityType
    onSubmitProp(newData)
  }, onError)
  
  return (
    <form onSubmit={onSubmit}>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <div className="mt-1">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                {...register('name', { required: true, validate: {
                  hyphen: (val) => !val.includes("-")
                }})}
                className={classNames(
                  "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                  errors?.name || errors?.nameCheck ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500",
                )}
                onChange={e=>setSearchQuery(e.target.value)}
              />
              <div>
                {loading && <Spinner color="text-gray-500" size={4}/>}
                {!loading && isValidName && delayedSearch && <CheckCircleIcon className="h-5 w-5 text-green-500"/>}
                {!loading && !isValidName && delayedSearch && <XCircleIcon className="h-5 w-5 text-red-500"/>}
              </div>
            </div>
            <div className='mt-1 text-red-500 text-xs'>
              <p>{errors?.name?.type === "required" && "This field is required"}</p>
              <p>{errors?.name?.type === "hyphen" && "Hyphen (-) is not a valid character in name"}</p>
              <p>{errors?.nameCheck?.type === "nameCheck" && "Name is already taken"}</p>
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
          disabled={loadingProps || loading || !isValidName || !isDirty}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500 disabled:bg-gray-500"
        >{loadingProps ? <Spinner /> : "Submit"}</button>
      </div>
    </form>
  )
}

export default EntityCreateForm