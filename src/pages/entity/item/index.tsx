import { GET_ITEM, GET_PRODUCT } from "@/api"
import Spinner from "@/components/Spinner"
import { ItemType, ProductType } from "@/types"
import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { StarIcon } from "@heroicons/react/24/solid"
import Options from "./Options"
import useCartStore from "@/stores/cart"
import { makeUniqueId } from "@apollo/client/utilities"

const EntityItem = () => {
  const setOrder = useCartStore((state) => state.setOrder)
  const order = useCartStore((state) => state.order)
  const [item, setItem] = useState<ItemType>()
  const { id } = useParams<{ id: string }>()
  const { loading, data, error } = useQuery<{ item: ItemType }>(GET_ITEM, {
    variables: { id },
    fetchPolicy: "no-cache",
  })
  const [getProduct] = useLazyQuery<{ product: ProductType }>(GET_PRODUCT, {
    variables: { id },
    fetchPolicy: "no-cache",
  })

  const [timeNow] = useState(new Date().valueOf())

  const [selected, setSelected] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState<number>(1)
  const [product, setProduct] = useState<ProductType>()

  useEffect(() => {
    data &&
      (() => {
        setItem(data.item)
        const obj = Object.fromEntries(
          data.item.instances[0].attributes.map((attr) => [
            attr.name,
            attr.value,
          ])
        )
        setSelected(obj)
      })()
  }, [data])

  useEffect(() => {
    const fetchData = async (id: string) => {
      const res = await getProduct({ variables: { id } })
      if (res.data) {
        setProduct(res.data.product)
        setQuantity(1)
      }
    }

    data &&
      (() => {
        const prod = data.item.instances.find((instance) => {
          return instance.attributes
            .map(
              (attr) =>
                attr.name in selected && selected[attr.name] === attr.value
            )
            .every((val) => val === true)
        })
        if (prod) {
          // setProduct({ id: prod.product.id })
          fetchData(prod.product.id)
        } else {
          setProduct(undefined)
        }
      })()
  }, [data, selected])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div>
        <h1>Cannot load item</h1>
      </div>
    )
  }

  return (
    <div className="max-w-6xl m-auto">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-6 rounded-lg overflow-hidden">
          <img
            src={`${item?.instances[0].product.photoData.url}?${timeNow}`}
            className="w-full"
          />
        </div>
        <div className="col-span-6 space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h1 className="text-2xl">{item?.name}</h1>
              <p className="text-xl font-medium">&#8369; 1500.00</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm">5.0</p>
              <StarIcon className="w-5 text-yellow-300" />
              <StarIcon className="w-5 text-yellow-300" />
              <StarIcon className="w-5 text-yellow-300" />
              <StarIcon className="w-5 text-yellow-300" />
              <StarIcon className="w-5 text-yellow-300" />
            </div>
          </div>
          <div className="space-y-2">
            {item?.categories.map((category) => (
              <div key={category.name}>
                <h2>{category.name}</h2>
                <Options
                  selected={selected}
                  category={category}
                  setSelected={setSelected}
                />
              </div>
            ))}
          </div>

          <div>
            <h2>Quantity</h2>
            <input
              id="visible-arrow"
              type="number"
              min="1"
              className="w-20 rounded-md border-gray-300 shadow-sm sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          <button
            type="button"
            className="bg-indigo-600 text-white font-medium rounded w-full py-2 disabled:bg-gray-300"
            disabled={product ? false : true}
            onClick={() => {
              setOrder({
                ...order,
                orderItems: [
                  ...order.orderItems,
                  {
                    uuid: makeUniqueId("order-item"),
                    product: product?.id ?? "",
                    sellPrice: product?.sellPrice ?? 0,
                    listPrice: product?.sellPrice ?? 0,
                    quantity: quantity,
                  },
                ],
              })
            }}
          >
            Add to cart
          </button>

          <h2>Description</h2>
          <p className="text-gray-500">{item?.description}</p>

          <hr />
        </div>
      </div>
    </div>
  )
}

export default EntityItem
