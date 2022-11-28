import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon, ArrowRightOnRectangleIcon, UserCircleIcon, TableCellsIcon, ShieldCheckIcon } from '@heroicons/react/20/solid'
import { useAuthStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import { UserRoles } from '@/types'

const MenuDropdown = () => {

  const user = useAuthStore(state => state.user)
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)
  
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-indigo-500 bg-opacity-100 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Account
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={()=>navigate("/my-account")}
                  >
                    <UserCircleIcon className='mr-2 h-5 w-5 text-violet-400'/>
                    My profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={()=>navigate("/my-stores")}
                  >
                    <TableCellsIcon className='mr-2 h-5 w-5 text-violet-400'/>
                    My stores
                  </button>
                )}
              </Menu.Item>
            </div>
            {user?.role === UserRoles.ADMIN && <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={()=>navigate("/admin")}
                  >
                    <ShieldCheckIcon className='mr-2 h-5 2-5 text-violet-400'/>
                    Admin
                  </button>
                )}
              </Menu.Item>
            </div>}
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={()=>logout()}
                  >
                    <ArrowRightOnRectangleIcon className='mr-2 h-5 2-5 text-violet-400'/>
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default MenuDropdown