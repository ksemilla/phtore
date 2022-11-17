import { GET_USERS } from "@/api"
import Spinner from "@/components/Spinner"
import { PageInfo, UserListInput, UserListResult } from "@/types"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import Inline from "./Inline"
import Pagination from "./Pagination"

const AdminUserList = () => {

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit: 10,
    skip: 0,
    totalCount: 0
  })
  const { loading, error, data, refetch } = useQuery<UserListResult, UserListInput>(GET_USERS, { variables: { filter: {}, limit: pageInfo.limit, skip: pageInfo.skip } })

  useEffect(()=>{
    data && setPageInfo(prevState => ({...prevState, totalCount: data.users.totalCount}))
  }, [data])

  refetch()

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>[Error] {error.message}</div>
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data?.users.list.map((user, idx) => (
                    <Inline key={user.id} user={user} idx={idx}/>
                  ))}
                </tbody>
              </table>
              <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserList