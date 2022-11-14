import { Outlet } from "react-router-dom"

const AdminUserLayout = () => {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminUserLayout