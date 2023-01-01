import { ItemType } from "@/types"
import { classNames } from "@/utils"
import { useNavigate } from "react-router-dom"

type InlineProps = {
  item: ItemType
  idx: number
}

const Inline = (props: InlineProps) => {
  const {item, idx} = props
  const navigate = useNavigate()
  return (
    <tr
      className={classNames(
        idx % 2 === 0 ? "" : 'bg-gray-50',
        "cursor-pointer hover:bg-gray-100"
      )}
      onClick={()=>navigate(`${item.id}`)}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div className="flex items-center space-x-2">
          <div>{item.name}</div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.name ? "true" : "false"}</td>
    </tr>
  )
}

export default Inline