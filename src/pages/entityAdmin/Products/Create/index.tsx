import ProductCreateForm from "@/forms/products/ProductCreateForm"
import { ProductType } from "@/types"
import { useState } from "react"

const EntityProductCreate = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const onSubmit = (data: ProductType) => {
    console.log(data)
  }

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