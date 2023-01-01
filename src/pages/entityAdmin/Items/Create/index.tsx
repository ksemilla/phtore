import { CREATE_ITEM } from "@/api"
import ItemForm from "@/forms/items/ItemForm"
import { useEntityStore } from "@/stores"
import { ItemCreateInput, ItemType } from "@/types"
import { CreateResponse } from "@/types/core"
import { logError } from "@/utils"
import { ApolloError, useMutation } from "@apollo/client"
import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const EntityItemCreate = () => {

  const navigate = useNavigate()
  const [createItem, { loading }] = useMutation<{createItem: CreateResponse}, { input: ItemCreateInput }>(CREATE_ITEM)
  const entity = useEntityStore(state => state.entity)
  const onSubmit = useCallback(async (data: ItemType) => {
    data.entity = entity?.id ?? ""
    try {
      const res = await createItem({variables: { input: data }})
      navigate(`/${entity?.slug}/admin/items/${res.data?.createItem.insertedId}`)
    } catch(e) {
      logError(e as ApolloError)
    }
  }, [])

  return (
    <div className="">
      <div className="py-5 sm:px-6 bg-gray-50">
        <h1 className="p-2 sm:px-0 text-xl font-semibold text-gray-900">New item</h1>
        <ItemForm
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default EntityItemCreate