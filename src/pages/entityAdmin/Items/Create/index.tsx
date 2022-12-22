import ItemForm from "@/forms/items/ItemForm"

const EntityItemCreate = () => {
  return (
    <div className="">
      <div className="px-4 py-5 sm:px-6 bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-900">New item</h1>
        <ItemForm />
      </div>
    </div>
  )
}

export default EntityItemCreate