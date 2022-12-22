import { FIND_PRODUCT_BY_NAME } from "@/api/products"
import Autosuggest from "@/components/AutoSuggest"
import Select from "@/components/elements/Select"
import { useEntityStore } from "@/stores"
import { ItemCategoryType, ItemType, ProductType } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useFormContext, useWatch } from "react-hook-form"

const InstanceForm = (props: { idx: number }) => {
  const { idx } = props
  const entity = useEntityStore(state => state.entity)
  const { setValue, formState: { errors }, register } = useFormContext<ItemType>()
  const categories = useWatch({ name: "categories" })
  const [delayedSearch, _searchQuery, setSearchQuery] = useSearchDebounce(1000)
  const { data } = useQuery<{ findProductsByName: ProductType[] }, { filter: { entity: string, name: string } }>(FIND_PRODUCT_BY_NAME, {variables: { filter: { entity: entity?.id ?? "", name: delayedSearch.replaceAll(" ", "-").toLowerCase()}}, fetchPolicy: "no-cache"})

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8">{idx + 1}</div>
      <div className="w-full grid grid-cols-12 gap-x-2">
        {categories?.map((category: ItemCategoryType, idx: number) => (
          <div key={idx} className="col-span-2">
            <Select
              {...register(`instances.${idx}.${category.name}`)}
            >
              {category?.choices?.map((choice, idxChoice) => (
                choice.name && <option key={idxChoice}>{choice.name}</option>
              ))}
            </Select>
          </div>
        ))}
        <div className="col-span-4">
          <Autosuggest<ProductType>
            {...register(`instances.${idx}.product.name`, { required: true })}
            options={data?.findProductsByName ?? []}
            resource="name"
            onQueryChange={(val) => setSearchQuery(val)}
            onOptionSelect={(val) => setValue(`instances.${idx}.product`, val as ProductType)}
          />
        </div>
      </div>
    </div>
  )
}

export default InstanceForm