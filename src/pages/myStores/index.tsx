import { MY_ENTITIES } from "@/api"
import Card from "@/components/Card"
import { MyEntityListInput, MyEntityListResult } from "@/types"
import { classNames } from "@/utils"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import MyEntities from "./myEntites"

const stores = [
  {
    id: "0",
    name: "Blusa at Bestida",
    tags: "sale"
  },
]

const MyStores = () => {

  return (
    <div>
      <section className="space-y-2">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">My Stores</h1>
            {/* <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p> */}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              to="create"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add store
            </Link>
          </div>
        </div>
        <MyEntities />
      </section>
    </div>
  )
}

export default MyStores