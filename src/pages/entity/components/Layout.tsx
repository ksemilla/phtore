import { GET_ENTITY, useQueryDeliveryMethodList } from "@/api"
import { useEntityStore } from "@/stores"
import { EntityType } from "@/types"
import { logError } from "@/utils"
import { ApolloError, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import Nav from "./Nav"
import OrderSummary from "./OrderSummary"

const EntityLayout = () => {
  const [getDeliveryMethods] = useQueryDeliveryMethodList()
  const setEntity = useEntityStore((state) => state.setEntity)
  const setDeliveryMethods = useEntityStore((state) => state.setDeliveryMethods)
  const { slug } = useParams<{ slug: string }>()
  const { data } = useQuery<{ entity: EntityType }>(GET_ENTITY, {
    variables: { slug },
    fetchPolicy: "no-cache",
  })
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false)

  useEffect(() => {
    data &&
      (() => {
        setEntity(data.entity)
      })()
  }, [data])

  useEffect(() => {
    const getQuery = async () => {
      try {
        const res = await getDeliveryMethods({
          variables: { filter: { entity: data?.entity.id ?? "" } },
        })
        setDeliveryMethods(res.data?.deliveryMethods?.list ?? [])
      } catch (e) {
        logError(e as ApolloError)
      }
    }

    data && getQuery()
  }, [data])

  return (
    <div>
      <Nav setShowOrderSummary={setShowOrderSummary} />
      <OrderSummary show={showOrderSummary} setShow={setShowOrderSummary} />
      <Outlet />
    </div>
  )
}

export default EntityLayout
