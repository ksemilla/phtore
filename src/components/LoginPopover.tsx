import { ArrowLeftOnRectangleIcon,  } from "@heroicons/react/24/solid"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { Popover } from '@headlessui/react'
import { useForm } from "react-hook-form"
import { LoginProps } from "@/types"
import { ApolloError, useMutation } from "@apollo/client"
import { LOGIN } from "@/api/auth"
import { useRef } from "react"
import { logError } from "@/utils"
import { useAuthStore } from "@/stores"
import Spinner from "./Spinner"

type LoginFormType = {
  buttonRef?: any
}

const LoginForm = (props: LoginFormType) => {

  const { register, handleSubmit } = useForm<LoginProps>()
  const [login, { error, loading }] = useMutation(LOGIN)
  const loginUser = useAuthStore(state => state.login)

  const onSubmit = handleSubmit(async (data)=>{
    try {
      const test = await login({ variables: { data: data } })
      loginUser(test.data.login.user)
      props.buttonRef.current.click()
    } catch(e) {
      logError(e as ApolloError)
    }
  })

  return <form onSubmit={onSubmit}>
    { error ? <h1 className="text-red-600 bg-red-200 font-medium mb-2 py-1 flex justify-center items-center space-x-2"> <ExclamationTriangleIcon className="h-5 w-5"/><span>{error.message}</span></h1> : <h1 className="text-center font-bold mb-2 py-1">Login</h1>}
    <div className="space-y-2">
      <div>
        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="Email"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        />
      </div>
      <div>
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        />
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
        <span className="font-medium text-gray-700 hover:text-indigo-500">Login</span>
      </Popover.Button>

      <Popover.Panel className="z-10 absolute top-9 -right-2">
        <div className="px-2 py-3 w-56 border rounded shadow">
          <LoginForm buttonRef={buttonRef} />
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default LoginPopover