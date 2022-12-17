import { GET_ENTITIES } from "@/api"
import Card from "@/components/Card"
import { EntityListInput, EntityListResult } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useRef } from "react"

const Home = () => {
  
  const [delayedSearch, searchQuery, setSearchQuery] = useSearchDebounce()
  const {loading, data, error} = useQuery<EntityListResult, EntityListInput>(GET_ENTITIES, { variables: { filter: { name: delayedSearch } } })

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="min-h-screen">
      <div className="h-96 flex items-center justify-center">
        <form>
          <div tabIndex={0} className="p-6 text-3xl border rounded-full max-w-xl" onClick={()=>inputRef.current?.focus()}>
            <div className="flex items-center space-x-4">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
              <input
                ref={inputRef}
                placeholder="Search store"
                className="outline-none"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      <div>
        <div className="p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.entities.list.map(entity => {
            return (
              <Card
                key={entity.id}
                classNamesProps="overflow-hidden flex justify-center"
                containerClassNames="h-48"
              >
                {entity.bannerData.url ? <img src={entity.bannerData.url} /> :
                  <div className="flex items-center">
                    <h1 className="font-normal text-2xl">{entity.name}</h1>
                  </div>
                }
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home