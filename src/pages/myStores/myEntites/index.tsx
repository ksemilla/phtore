import { MY_ENTITIES } from "@/api"
import { EntityType, MyEntityListInput } from "@/types"
import { useQuery } from "@apollo/client"
import Card from "@/components/Card"
import { classNames } from "@/utils"
import { useNavigate } from "react-router-dom"

const MyEntities = () => {

  const navigate = useNavigate()
  const {loading, data, error} = useQuery<{ myEntities: EntityType[] }, MyEntityListInput>(MY_ENTITIES, {fetchPolicy: "no-cache"})

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!loading && !error && data?.myEntities.map((entity) =>
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
    </div>
  )
}

export default MyEntities