import { GET_ITEMS } from "@/api"
import Spinner from "@/components/Spinner"
import { useEntityStore } from "@/stores"
import { ItemListInput, ItemListResult, PageInfo } from "@/types"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import ItemCard from "./ItemCard"

const EntityHome = () => {

  const entity = useEntityStore(state => state.entity)
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit: 10,
    skip: 0,
    totalCount: 0
  })
  const { loading, error, data } = useQuery<ItemListResult, ItemListInput>(GET_ITEMS, { variables: { filter: { entity: entity?.id ?? "" }, limit: 0, skip: pageInfo.skip }, skip: !entity ? true: false, fetchPolicy: "no-cache" })

  useEffect(()=>{
    data && setPageInfo(prevState => ({...prevState, totalCount: data.items.totalCount}))
  }, [data])

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <div>[Error] {error.message}</div>
  }

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
            {data?.items.list.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityHome