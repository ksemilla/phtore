import { GET_ENTITY } from "@/api"
import { useEntityStore } from "@/stores"
import { EntityType } from "@/types"
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Outlet, useParams } from "react-router-dom"
import Nav from "./Nav"
import OrderSummary from "./OrderSummary"

const EntityLayout = () => {

  const setEntity = useEntityStore(state => state.setEntity)
  const { slug } = useParams<{ slug: string }>()
  const {data} = useQuery<{ entity: EntityType }>(GET_ENTITY, { variables: { slug }, fetchPolicy: "no-cache" })
  const [showOrderSummary, setShowOrderSummary] = useState<boolean>(false)

  useEffect(()=>{
    data && (()=>{
      setEntity(data.entity)
    })()
  }, [data])

  return (
    <div>
      <Nav
        setShowOrderSummary={setShowOrderSummary}
      />
      <OrderSummary
        show={showOrderSummary}
        setShow={setShowOrderSummary}
      />
      <Outlet />
    </div>
  )
}

export default EntityLayout