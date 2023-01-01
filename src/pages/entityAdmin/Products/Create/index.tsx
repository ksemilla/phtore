import { CREATE_PRODUCT } from "@/api/products"
import ProductCreateForm from "@/forms/products/ProductCreateForm"
import { useEntityStore } from "@/stores"
import { ProductCreateInput, ProductType } from "@/types"
import { CreateResponse } from "@/types/core"
import { logError } from "@/utils"
import { ApolloError, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const EntityProductCreate = () => {

  const navigate = useNavigate()
  const [createProduct, { loading }] = useMutation<{ createProduct: CreateResponse }, { input: ProductCreateInput }>(CREATE_PRODUCT)
  const entity = useEntityStore(state => state.entity)
  const onSubmit = useCallback(async (data: ProductType) => {
    data.entity = entity?.id ?? ""
    try {
      const res = await createProduct({variables: { input: data }})
      navigate(`/${entity?.slug}/admin/products/${res.data?.createProduct.insertedId}`)
    } catch(e) {
      logError(e as ApolloError)
    }
  }, [])

  return (
    <div className="md:p-6">
      <div className="px-4 py-5 sm:px-6 bg-white shadow md:rounded-lg">
        <h1 className="text-lg font-medium leading-6 text-gray-900">New product</h1>
        <ProductCreateForm
          loading={loading}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  )
}

export default EntityProductCreate