import { GET_PRODUCT } from "@/api"
import { ItemType, ProductType } from "@/types"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const ItemCard = ({ item }: { item: ItemType }) => {

  const [product, setProduct] = useState<ProductType>()
  const {loading, data, error} = useQuery<{ product: ProductType }>(GET_PRODUCT, { variables: { id: item.instances[0].product.id }, fetchPolicy: "no-cache" })

  const timeNow = new Date().valueOf()

  useEffect(()=>{
    data && setProduct(data.product)
  }, [data])

  return (
    <Link key={item.id} to={`item/${item.id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={`${product?.photoData.url}?${timeNow}`}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">&#8369; {product?.sellPrice}</p>
    </Link>
  )
}

export default ItemCard