import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { classNames } from '@/utils'
import { Link, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ENTITY } from '@/api'
import { EntityType } from '@/types'
import { useAuthStore, useEntityStore } from '@/stores'
import Spinner from '@/components/Spinner'
import EntitySwitch from '@/components/EntitySwitch'
import Identicon from '@/components/Identicon'

type NavItem = {
  name: string,
  path: string,
  icon: (props: React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
  }) => JSX.Element,
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '', icon: HomeIcon },
  { name: 'Products', path: 'products', icon: UsersIcon },
  { name: 'Items', path: 'items', icon: UsersIcon },
  { name: 'Customer Orders', path: 'customer-orders', icon: FolderIcon },
  { name: 'Invoices', path: 'invoices', icon: InboxIcon },
  { name: 'Customers', path: 'customers', icon: ChartBarIcon },
  { name: 'Reports', path: 'reports', icon: ChartBarIcon },
  { name: 'Members', path: 'members', icon: ChartBarIcon },
]

export default function EntityAdminLayout() {

  const isLogged = useAuthStore(state => state.isLogged)
  const setEntity = useEntityStore(state => state.setEntity)

  const { slug } = useParams<{ slug: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useAuthStore(state => state.user)

  const location = useLocation()
  const subPath = location.pathname.split("/")[3] ?? ""

  const {data} = useQuery<{ entity: EntityType }>(GET_ENTITY, { variables: { slug }, fetchPolicy: "no-cache" })

  useEffect(()=>{
    data && setEntity(data.entity)
  }, [data])

  

  if (!isLogged) {
    return <Navigate to="/login" />
  }

  return (
    <div className='min-h-full'>
      <div className='bg-gray-50'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={classNames(
                            item.path === subPath
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.path === subPath ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        <div>
                          <img
                            className="inline-block h-10 w-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                          <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden bg-white md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col" style={{ marginTop: "70px" }}>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="px-2">
                <EntitySwitch />
              </div>
              <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={classNames(
                      item.path === subPath ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.path === subPath ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <Link to={`/${data?.entity.slug}`} className="group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                <HomeIcon
                  className='mr-3 flex-shrink-0 h-6 w-6'
                />
                Go to store
              </Link>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <div className="group block w-full flex-shrink-0">
                <div className="flex items-center">
                  <div>
                    <Identicon
                      value={user?.email ?? ""}
                      size={50}
                      containerSize={10}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user?.name}</p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 bg-gray-50">
            {data && <Outlet />}
            {!data && <Spinner />}
          </main>
        </div>
      </div>
    </div>
  )
}
