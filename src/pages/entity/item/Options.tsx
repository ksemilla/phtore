import { ItemCategoryChoiceType, ItemCategoryType } from "@/types"
import { classNames } from "@/utils"

type OptionsProps = {
  selected: Record<string, string>
  category: ItemCategoryType
  setSelected: React.Dispatch<React.SetStateAction<Record<string, string>>>
}

const Options = (props: OptionsProps) => {

  const {selected, category, setSelected} = props

  return (
    <div className="grid grid-cols-6 gap-4">
      {category?.choices.map((choice) => (
        <div
          key={choice.name}
          className={classNames(
            "col-span-1 border text-center rounded-md p-2 cursor-pointer hover:text-white hover:bg-indigo-400",
            selected[category.name] === choice.name ? "bg-indigo-600 text-white" : ""
          )}
          onClick={()=>{
            setSelected(prevState => ({
              ...prevState,
              [category.name]: choice.name
            }))
          }}
          >
          {choice.name}
        </div>
      ))}
    </div>
  )
}

export default Options