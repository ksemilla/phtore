import { GET_PRODUCT, UPDATE_PRODUCT } from "@/api/products"
import ProductCreateForm from "@/forms/products/ProductCreateForm"
import { ProductType, ProductCreateInput } from "@/types"
import { logError } from "@/utils"
import { ApolloError, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import Photo from "./Photo"

const ProductEdit = () => {

  const { id } = useParams<{ id: string }>()
  const {data, error} = useQuery<{ product: ProductType }>(GET_PRODUCT, { variables: { id }, fetchPolicy: "no-cache" })

  const [updateProduct, { loading }] = useMutation<ProductType, { id: string, input: ProductCreateInput }>(UPDATE_PRODUCT)

  const onSubmit = async (formValues: ProductType) => {
    try {
      // TODO: update cache when success
      await updateProduct({ variables: { id: id ?? "", input: formValues } })
    } catch(e) {
      logError(e as ApolloError)
    }
  }

  console.log(data)

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Product {id}</h1>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto mt-8 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-3">

          <div className="space-y-6 lg:col-span-3">
              <div className="bg-white shadow  grid grid-cols-1 lg:divide-x-2 lg:divide-gray-100 lg:grid-cols-3 sm:rounded-lg">
                <div className="px-4 py-5 border-b lg:border-none sm:px-6">
                  {/* <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    Photo
                  </h2> */}
                  <Photo
                    url={data?.product.photoData.url}
                  />
                </div>
                <div className="px-4 py-5 sm:px-6 lg:col-span-2">
                  <h2 id="applicant-information-title" className="text-lg font-medium leading-6 text-gray-900">
                    General Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your store</p>
                  <ProductCreateForm
                    loading={false}
                    onSubmit={onSubmit}
                    defaultValues={data?.product}
                  />
                </div>
              </div>
            </div>

          {/* <div className="space-y-6 lg:col-span-1">
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
          </div> */}
          
        </div>
      </div>
    </div>
  )
}

export default ProductEdit