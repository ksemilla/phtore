import { UserType, UserUpdateInput } from '@/types'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { classNames, dirtyValues, logError } from '@/utils'
import { ApolloError, useMutation } from '@apollo/client'
import { UPDATE_USER } from '@/api'
import { useAuthStore } from '@/stores'
import Spinner from '@/components/Spinner'

const GeneralInfo = (props: { user: UserType }) => {
  const { user } = props
  const setUser = useAuthStore(state => state.setUser)
  const thisUser = useAuthStore(state => state.user) ?? {}
  const { register, reset, handleSubmit, formState: { isDirty, errors, dirtyFields } } = useForm<UserType>()

  const [updateUser, { loading }] = useMutation<UserType, { id: string, data: UserUpdateInput }>(UPDATE_USER)

  useEffect(()=>{
    user && reset(user)
  }, [user])
  
  const onSubmit = handleSubmit(async (formValues) => {
    const dirtyFormValues = dirtyValues(dirtyFields, formValues)
    try {
      await updateUser({ variables: { id: user?.id, data: dirtyFormValues } })
      const updatedUser = Object.assign(thisUser, dirtyFormValues) as UserType
      setUser(updatedUser)
      reset()
    } catch(e) {
      logError(e as ApolloError)
    }
    
  })

  return (
    <section aria-labelledby="applicant-information-title">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
            User Information
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
        </div>
        <form onSubmit={onSubmit}>
          <fieldset>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1">
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.name ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                    />
                    <div className='mt-1 text-red-500 text-xs'>{errors?.name?.type === "required" && "This field is required"}</div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1">
                    <input
                      {...register('email', { required: true })}
                      type="text"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.email ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                    />
                    <div className='mt-1 text-red-500 text-xs'>{errors?.email?.type === "required" && "This field is required"}</div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <input
                      type="text"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.phone ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                      defaultValue={user?.id}
                      disabled
                    />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1">
                    <input
                      {...register('phone', { required: true })}
                      type="text"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.phone ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                    />
                    <div className='mt-1 text-red-500 text-xs'>{errors?.phone?.type === "required" && "This field is required"}</div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                  <dd className="mt-1">
                    <input
                      {...register('mobile', { required: true })}
                      type="text"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.mobile ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                    />
                    <div className='mt-1 text-red-500 text-xs'>{errors?.mobile?.type === "required" && "This field is required"}</div>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="mt-1">
                    <input
                      {...register('dateOfBirth', { required: true })}
                      type="date"
                      className={classNames(
                        "block w-full max-w-lg rounded-md border-gray-300 shadow-sm  sm:max-w-xs sm:text-sm disabled:text-gray-500",
                        errors?.dateOfBirth ? "focus:border-red-500 focus:ring-red-500" : "focus:border-indigo-500 focus:ring-indigo-500"
                      )}
                    />
                    <div className='mt-1 text-red-500 text-xs'>{errors?.dateOfBirth?.type === "required" && "This field is required"}</div>
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <div
                className="block bg-gray-50 px-4 py-4 text-end text-sm font-medium text-gray-500 sm:rounded-b-lg"
              >
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:hover:bg-gray-500 disabled:bg-gray-500"
                  disabled={!isDirty}
                >
                  {loading ? <Spinner /> : "Update"}
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  )
}

export default GeneralInfo