import { FIND_PRODUCT_BY_NAME } from "@/api/products"
import Autosuggest from "@/components/AutoSuggest"
import { useEntityStore } from "@/stores"
import { ItemCategoryType, ItemType, ProductType } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { Controller, useFormContext, useWatch } from "react-hook-form"

const InstanceForm = (props: { idx: number }) => {
  const { idx } = props
  const entity = useEntityStore(state => state.entity)
  const { control, setValue, formState: { errors }, register } = useFormContext<ItemType>()
  const categories = useWatch({ name: "categories" })
  const [delayedSearch, searchQuery, setSearchQuery] = useSearchDebounce(1000)
  const { loading, data, error } = useQuery<{ findProductsByName: ProductType[] }, { filter: { entity: string, name: string } }>(FIND_PRODUCT_BY_NAME, {variables: { filter: { entity: entity?.id ?? "", name: delayedSearch.replaceAll(" ", "-").toLowerCase()}}, fetchPolicy: "no-cache"})

  return (
    <div className="border">
      {categories.map((category: ItemCategoryType, idx: number) => (
        <div key={idx}>
          <label>{category.name}</label>
          <select
            {...register(`instances.${idx}.${category.name}`)}
          >
            {category.choices.map((choice, idxChoice) => (
              <option key={idxChoice}>{choice.name}</option>
            ))}
          </select>
        </div>
      ))}
      <div>
        <label>Product</label>
        <Autosuggest<ProductType>
          {...register(`instances.${idx}.product.name`, { required: true })}
          options={data?.findProductsByName ?? []}
          resource="name"
          onQueryChange={(val) => setSearchQuery(val)}
          onOptionSelect={(val) => setValue(`instances.${idx}.product`, val as ProductType)}
        />
      </div>
    </div>
  )
}

export default InstanceForm