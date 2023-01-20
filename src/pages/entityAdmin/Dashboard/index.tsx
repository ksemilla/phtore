import { useEntityStore } from "@/stores"
import Banner from "./Banner"
import DeliveryMethods from "./DeliveryMethods"

const EntityAdminDashboard = () => {

  const entity = useEntityStore(state => state.entity)

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-2">
            <div className="space-y-6 lg:col-span-3">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    General Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your store</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:col-span-3">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    Banner
                  </h2>
                  <Banner url={entity?.bannerData.url} />
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:col-span-3">
              <div className="bg-white shadow sm:rounded-lg">
                <DeliveryMethods />
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <div className="bg-white shadow sm:rounded-lg divide-y-2 divide-gray-50">
              <div className="px-4 py-5 sm:px-6">
                <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                  Orders
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your store</p>
              </div>
              <div className="px-4 py-5 sm:px-6">
                test
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default EntityAdminDashboard