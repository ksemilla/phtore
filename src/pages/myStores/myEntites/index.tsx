import { MY_ENTITIES } from "@/api"
import { MyEntityListInput, MyEntityListResult, PageInfo } from "@/types"
import { useQuery } from "@apollo/client"
import Card from "@/components/Card"
import { classNames } from "@/utils"
import { useNavigate } from "react-router-dom"
import Pagination from "@/components/Pagination"
import { useState } from "react"

const MyEntities = () => {

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    limit: 10,
    skip: 0,
    totalCount: 0
  })

  const navigate = useNavigate()
  const {loading, data, error} = useQuery<MyEntityListResult, MyEntityListInput>(MY_ENTITIES, {variables: { limit: 20, skip: 0 }, fetchPolicy: "no-cache"})

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!loading && !error && data?.myEntities.list.map((entity) =>
          <Card
            key={entity.id}
            classNamesProps={classNames(
              "divide divide-y divide-gray-200"
            )}
            onClick={()=>navigate(`/${entity.slug}/admin`)}
            >
            <div className="p-4">
              <h1 className="whitespace-nowrap">{entity.name}</h1>
            </div>
            <div className="px-4 py-2">{entity.name}</div>
          </Card>
        )}
        
      </div>
    <Pagination
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
      />
    </div>
  )
}

export default MyEntities