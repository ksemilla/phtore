import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Popover } from '@headlessui/react'
import { useForm} from "react-hook-form"
import { UserCreateGraphType, UserCreateResponse, UserCreateType } from "@/types"
import { ApolloError, useMutation } from "@apollo/client"
import { useRef } from "react"
import { classNames, logError } from "@/utils"
import Spinner from "./Spinner"
import { CREATE_USER } from "@/api"

type CreateUserFormType = {
  buttonRef?: React.RefObject<HTMLButtonElement>
}

const CreateUserForm = (props: CreateUserFormType) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<UserCreateType>()
  const password = watch("password")
  const [createUser, { error, loading }] = useMutation<UserCreateResponse, { data: UserCreateGraphType } >(CREATE_USER)

  const onSubmit = handleSubmit(async (formValues)=>{
    console.log(formValues)

    const newFormValues = {
      email: formValues.email,
      password: formValues.password
    }

    try {
      await createUser({ variables: { data: newFormValues } })
      props.buttonRef?.current?.click()
    } catch(e) {
      logError(e as ApolloError)
    }
  })

  return <form onSubmit={onSubmit}>
    { error ? <h1 className="text-red-600 bg-red-200 font-medium mb-2 py-1 flex justify-center items-center space-x-2"> <ExclamationTriangleIcon className="h-5 w-5"/><span>{error.message}</span></h1> : <h1 className="text-center font-bold mb-2 py-1">Create account</h1>}
    <div className="space-y-2">
      <div className="space-y-1">
        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="Email"
          className={classNames(
            "block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm",
            errors?.email ? "border-red-300" : "border-gray-300"
          )}
        />
        {errors?.email?.type === "required" && <div className="text-xs text-red-500 font-medium">This field is required</div>}
      </div>
      <div className="space-y-1">
        <input
          {...register("password", { required: true, minLength: 6 })}
          type="password"
          placeholder="Password"
          className={classNames(
            "block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm",
            errors?.password ? "border-red-300" : "border-gray-300"
          )}
        />
        {errors?.password?.type === "required" && <div className="text-xs text-red-500 font-medium">This field is required</div>}
        {errors?.password?.type === "minLength" && <div className="text-xs text-red-500 font-medium">Minimum of 6 characters</div>}
      </div>
      <div className="space-y-1">
        <input
          {...register("confirmPassword", { required: true, validate: { equal: v => v === password } })}
          type="password"
          placeholder="Confirm password"
          className={classNames(
            "block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm",
            errors?.confirmPassword ? "border-red-300" : "border-gray-300"
          )}
        />
        {errors?.confirmPassword?.type === "required" && <div className="text-xs text-red-500 font-medium">This field is required</div>}
        {errors?.confirmPassword?.type === "equal" && <div className="text-xs text-red-500 font-medium">Should be the same with password</div>}
      </div>
      <button
        disabled={loading}
        type="submit"
        className="flex justify-center w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >{loading ? <Spinner /> : "Submit"}</button>
    </div>
  </form>
}

function CreateAccountPopover() {

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Popover className="relative">
      <Popover.Button ref={buttonRef} className="flex items-center space-x-1 outline-none">
        <span className="font-medium text-gray-700 hover:text-indigo-500 px-4">Create account</span>
      </Popover.Button>

      <Popover.Panel className="z-10 absolute top-9 -right-2">
        <div className="px-2 py-3 w-56 border rounded shadow bg-white">
          <CreateUserForm buttonRef={buttonRef} />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default CreateAccountPopover