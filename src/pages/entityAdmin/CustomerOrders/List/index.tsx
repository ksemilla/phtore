import { useListOrder } from "@/api/order"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"
import { useEntityStore } from "@/stores"
import { OrderStatus, PageInfo } from "@/types"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Inline from "./Inline"

const EntityCustomerOrders = () => {
  const entity = useEntityStore((state) => state.entity)
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit: 10,
    skip: 0,
    totalCount: 0,
  })
  const { data, loading, error } = useListOrder({
    entity: entity?.id ?? "",
    limit: pageInfo.limit,
    skip: pageInfo.skip,
  })

  useEffect(() => {
    data &&
      setPageInfo((prevState) => ({
        ...prevState,
        totalCount: data.orders.totalCount,
      }))
  }, [data])

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner color="text-black" size={6} />
      </div>
    )

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="create"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add product
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data?.orders.list.map((order, idx) => (
                    <Inline key={order.id} order={order} idx={idx} />
                  ))}
                </tbody>
              </table>
              <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityCustomerOrders
