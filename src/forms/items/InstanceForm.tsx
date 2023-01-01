import { FIND_PRODUCT_BY_NAME } from "@/api/products"
import Autosuggest, { GenericRecord } from "@/components/AutoSuggest"
import Select from "@/components/elements/Select"
import { useEntityStore } from "@/stores"
import { ItemCategoryType, ItemType, ProductType } from "@/types"
import { useSearchDebounce } from "@/utils"
import { useQuery } from "@apollo/client"
import { useCallback, useEffect } from "react"
import { FieldArrayWithId, useFieldArray, UseFieldArrayRemove, useFormContext, useWatch } from "react-hook-form"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { makeUniqueId } from "@apollo/client/utilities"

type InstanceFormProps = {
  idx: number
  removeInstance: UseFieldArrayRemove
}

const InstanceForm = (props: InstanceFormProps) => {
  const { idx, removeInstance } = props
  const entity = useEntityStore(state => state.entity)
  const { setValue, formState: { errors }, register, getValues } = useFormContext<ItemType>()
  const [delayedSearch, _searchQuery, setSearchQuery] = useSearchDebounce(1000)
  const { loading, data } = useQuery<{ findProductsByName: ProductType[] }, { filter: { entity: string, name: string } }>(FIND_PRODUCT_BY_NAME, {variables: { filter: { entity: entity?.id ?? "", name: delayedSearch.replaceAll(" ", "-").toLowerCase()}}, fetchPolicy: "no-cache"})

  const onQueryChange = useCallback((val: string) => setSearchQuery(val), [])
  const onOptionSelect = useCallback((val: GenericRecord) => {
    console.log(val)
    setValue(`instances.${idx}.product.name`, val?.name)
    setValue(`instances.${idx}.product.id`, val?.id)
    setValue(`instances.${idx}.product.photoData`, val.photoData)
  }, [])

  const {control} = useFormContext<ItemType>()

  const { fields: attributes } = useFieldArray({
    control,
    name: `instances.${idx}.attributes`,
    keyName: "uuid"
  })
  const categories: FieldArrayWithId<ItemType, "categories", "uuid">[] = (useWatch({ name: "categories" }) ?? []).map((item: ItemCategoryType) => ({...item, uuid: makeUniqueId("cat")}))

  useEffect(()=>{
    const instances = getValues("instances")
    if (instances) {
      instances.forEach((instance, instanceIdx) => {
        categories.forEach((category, categoryIdx) => {
          setValue(`instances.${instanceIdx}.attributes.${categoryIdx}.name`, category.name)
        })

      })
    }
  }, [categories, getValues])

  const renderOption = useCallback((val: Record<string, any>) => `${val.name} - ${val.quantity} pcs`, [])

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8">{idx + 1}</div>
      <div className="w-full grid grid-cols-12 gap-x-2">
        {attributes.map((attr, attrIdx) => (
          <div key={attr.uuid} className="col-span-2">
            <input
              type="hidden"
              {...register(`instances.${idx}.attributes.${attrIdx}.name`, { required: true })}
            />
            <Select
              {...register(`instances.${idx}.attributes.${attrIdx}.value`, { required: true })}
              hasError={errors?.instances?.[idx]?.attributes?.[attrIdx]?.value ? true: false}
            >
              <option disabled value="" className="">Select</option>
              {categories?.[attrIdx]?.choices?.map((choice) => (
                choice.name && <option key={choice.name}>{choice.name}</option>
              ))}
            </Select>
          </div>
        ))}
        <div className="col-span-4">
            <input
              type="hidden"
              {...register(`instances.${idx}.product.photoData.url`)}
            />
          <Autosuggest<ProductType>
            {...register(`instances.${idx}.product.name`, { required: true })}
            options={data?.findProductsByName ?? []}
            resource="name"
            onQueryChange={onQueryChange}
            onOptionSelect={onOptionSelect}
            hasError={(errors?.instances?.[idx]?.product as any)?.name ? true : false}
            loading={loading}
            renderOption={renderOption}
          />
        </div>
        <button
          type="button"
          className="hover:text-red-500"
          onClick={()=>removeInstance(idx)}
        >
          <XMarkIcon className="h-4"/>
        </button>
      </div>
    </div>
  )
}

export default InstanceForm