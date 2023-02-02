import { useFetchOrder } from "@/api/order"
import Spinner from "@/components/Spinner"
import Form from "@/hooks/hookForm"
import { Order } from "@/types"
import { useParams } from "react-router-dom"
import CustomerData from "./CustomerData"
import Status from "./Status"

const EntityCustomerOrderDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading } = useFetchOrder({ id: id ?? "" })

  if (loading) {
    return <Spinner />
  }

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8 sm:flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Order {id}</h1>
        <div>{data && <Status defaultValues={data.order} />}</div>
      </div>
      <div className="mx-auto sm:px-6 md:px-8">
        <div className="mx-auto mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-3 bg-white shadow sm:rounded-lg">
            <Form<Order> defaultValues={data?.order}>
              <div className="divide-y divide-gray-200">
                <CustomerData />
                <div>Items</div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityCustomerOrderDetail
