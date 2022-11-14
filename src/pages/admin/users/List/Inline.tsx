import Identicon from "@/components/Identicon"
import { UserType } from "@/types"
import { classNames } from "@/utils"

type InlineProps = {
  user: UserType
  idx: number
}

const Inline = (props: InlineProps) => {
  const {user, idx} = props
  return (
    <tr key={user.email} className={classNames(
      idx % 2 === 0 ? "" : 'bg-gray-50',
      "cursor-pointer hover:bg-gray-100"
    )}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <div className="flex items-center space-x-2">
          <Identicon
            value={user.email}
            size={50}
            containerSize={12}
          />
          <div>
            <div className="font-medium text-gray-900">{user.email}</div>
            <div className="text-gray-500">{user.name}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.id}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.role}</td>
    </tr>
  )
}

export default Inline