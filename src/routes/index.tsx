import AdminLayout from "@/layouts/AdminLayout";
import AdminUserLayout from "@/layouts/AdminUserLayout";
import MyAccountLayout from "@/layouts/MyAccountLayout";
import Account from "@/pages/account";
import Admin from "@/pages/admin";
import AdminStores from "@/pages/admin/stores";
import AdminUserList from "@/pages/admin/users/List";
import EntityAdmin from "@/pages/entityAdmin";
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
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<Admin />} />
        <Route path="users" element={<AdminUserLayout />}>
          <Route path="" element={<AdminUserList />} />
        </Route>
        <Route path="stores" element={<AdminStores />} />
      </Route>
      <Route path="/:entity">
        <Route path="admin" element={<AuthLayout />}>
          <Route path="" element={<EntityAdmin />} />
        </Route>
      </Route>
    </Route>
  )
)