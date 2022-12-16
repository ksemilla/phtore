import AdminLayout from "@/layouts/AdminLayout";
import AdminUserLayout from "@/layouts/AdminUserLayout";
import EntityAdminLayout from "@/layouts/EntityAdminLayout";
import MyAccountLayout from "@/layouts/MyAccountLayout";
import MyStoresLayout from "@/layouts/MyStoresLayout";
import Account from "@/pages/account";
import Admin from "@/pages/admin";
import AdminStores from "@/pages/admin/stores";
import AdminUserList from "@/pages/admin/users/List";
import EntityCustomerOrders from "@/pages/entityAdmin/CustomerOrders";
import EntityAdminDashboard from "@/pages/entityAdmin/Dashboard"
import EntityProductCreate from "@/pages/entityAdmin/Products/Create";
import ProductEdit from "@/pages/entityAdmin/Products/Edit";
import EntityProductList from "@/pages/entityAdmin/Products/List";
import MyStores from "@/pages/myStores";
import EntityCreate from "@/pages/myStores/Create";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home"

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/my-account" element={<MyAccountLayout />}>
        <Route path="" element={<Account />} />
      </Route>
      <Route path="/my-stores" element={<MyStoresLayout />}>
        <Route path="" element={<MyStores />} />
        <Route path="create" element={<EntityCreate />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Admin />} />
        <Route path="users" element={<AdminUserLayout />}>
          <Route path="" element={<AdminUserList />} />
        </Route>
        <Route path="stores" element={<AdminStores />} />
      </Route>
      <Route path="/:slug">
        <Route path="admin" element={<AuthLayout />}>
          <Route element={<EntityAdminLayout />}>
            <Route path="" element={<EntityAdminDashboard />} />
            <Route path="products">
              <Route path="" element={<EntityProductList />} />
              <Route path=":id" element={<ProductEdit />} />
              <Route path="create" element={<EntityProductCreate />} />
            </Route>
            <Route path="customer-orders" element={<EntityCustomerOrders />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
)