import { CREATE_ENTITY } from "@/api"
import EntityCreateForm from "@/forms/entity/EntityCreateForm"
import { EntityCreateInput } from "@/types"
import { CreateResponse } from "@/types/core"
import { logError } from "@/utils"
import { ApolloError, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"

const EntityCreate = () => {

  const navigate = useNavigate()
  const [createEntity, { loading }] = useMutation<CreateResponse, { input: EntityCreateInput }>(CREATE_ENTITY)

  const onSubmit = async (formValues: EntityCreateInput) => {
    try {
      await createEntity({variables: { input: formValues }})
      navigate(`/${formValues.name.replaceAll(" ", "-").toLowerCase()}/admin`)
    } catch(e) {
      logError(e as ApolloError)
    }
  }

  return (
    <div>
      <EntityCreateForm
        loading={loading}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default EntityCreate