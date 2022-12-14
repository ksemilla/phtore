import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Popover } from '@headlessui/react'
import { useForm } from "react-hook-form"
import { LoginProps, LoginResult } from "@/types"
import { ApolloError, useMutation } from "@apollo/client"
import { LOGIN } from "@/api/auth"
import { useRef, useState } from "react"
import { classNames, logError } from "@/utils"
import { useAuthStore } from "@/stores"
import Spinner from "./Spinner"

type LoginFormType = {
  buttonRef?: React.RefObject<HTMLButtonElement>
}

const LoginForm = (props: LoginFormType) => {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginProps>()
  const [login, { error, loading }] = useMutation<LoginResult, { data: LoginProps } >(LOGIN)
  const loginUser = useAuthStore(state => state.login)
  const [rememberPassword, setRememberPassword] = useState<boolean>(false)

  const onSubmit = handleSubmit(async (formValues)=>{
    try {
      const { data } = await login({ variables: { data: formValues } })
      data && loginUser(data.login.user)
      props.buttonRef?.current?.click()
      rememberPassword && localStorage.setItem("token", data?.login.token ?? "")
    } catch(e) {
      logError(e as ApolloError)
    }
  })

  return <form onSubmit={onSubmit}>
    { error ? <h1 className="text-red-600 bg-red-200 font-medium mb-2 py-1 flex justify-center items-center space-x-2"> <ExclamationTriangleIcon className="h-5 w-5"/><span>{error.message}</span></h1> : <h1 className="text-center font-bold mb-2 py-1">Login</h1>}
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
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className={classNames(
            "block w-full max-w-lg rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm",
            errors?.password ? "border-red-300" : "border-gray-300"
          )}
        />
        {errors?.password?.type === "required" && <div className="text-xs text-red-500 font-medium">This field is required</div>}
      </div>
      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={e=>setRememberPassword(e.target.checked)}
          checked={rememberPassword}
        />
        <label className="text-sm font-normal">Remember password?</label>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="flex justify-center w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >{loading ? <Spinner /> : "Submit"}</button>
    </div>
  </form>
}

function LoginPopover() {

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Popover className="relative">
      <Popover.Button ref={buttonRef} className="flex items-center space-x-1 outline-none">
        <span className="font-medium text-gray-700 hover:text-indigo-500 px-2">Login</span>
      </Popover.Button>

      <Popover.Panel className="z-10 absolute top-9 -right-2">
        <div className="px-2 py-3 w-56 border rounded shadow bg-white">
          <LoginForm buttonRef={buttonRef} />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default LoginPopover