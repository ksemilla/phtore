import AdminLayout from "@/layouts/AdminLayout";
import AdminUserLayout from "@/layouts/AdminUserLayout";
import EntityAdminLayout from "@/layouts/EntityAdminLayout";
import Account from "@/pages/account";
import Admin from "@/pages/admin";
import AdminStores from "@/pages/admin/stores";
import AdminUserList from "@/pages/admin/users/List";
import EntityCustomerOrders from "@/pages/entityAdmin/CustomerOrders";
import EntityAdminDashboard from "@/pages/entityAdmin/Dashboard"
import EntityItemCreate from "@/pages/entityAdmin/Items/Create";
import EntityProductCreate from "@/pages/entityAdmin/Products/Create";
import ProductEdit from "@/pages/entityAdmin/Products/Edit";
import EntityItems from "@/pages/entityAdmin/Items/List";
import EntityProductList from "@/pages/entityAdmin/Products/List";
import MyStores from "@/pages/myStores";
import EntityCreate from "@/pages/myStores/Create";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home"
import EntityItemEdit from "@/pages/entityAdmin/Items/Edit";
import EntityLayout from "@/pages/entity/components/Layout";
import EntityHome from "@/pages/entity/home";
import EntityItem from "@/pages/entity/item";
import Checkout from "@/pages/entity/checkout";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route path="" element={<Home />} />
      <Route path="my-account" element={<Account />} />

      <Route path="my-stores">
        <Route path="" element={<MyStores />} />
        <Route path="create" element={<EntityCreate />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="" element={<Admin />} />
        <Route path="users" element={<AdminUserLayout />}>
          <Route path="" element={<AdminUserList />} />
        </Route>
        <Route path="stores" element={<AdminStores />} />
      </Route>
      <Route path=":slug">
        <Route element={<EntityLayout />}>
          <Route path="" element={<EntityHome />} />
          <Route path="item/:id" element={<EntityItem />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="admin" element={<EntityAdminLayout />}>
          <Route path="" element={<EntityAdminDashboard />} />
          <Route path="products">
            <Route path="" element={<EntityProductList />} />
            <Route path=":id" element={<ProductEdit />} />
            <Route path="create" element={<EntityProductCreate />} />
          </Route>
          <Route path="items">
            <Route path="" element={<EntityItems />} />
            <Route path=":id" element={<EntityItemEdit />} />
            <Route path="create" element={<EntityItemCreate />} />
          </Route>
          <Route path="customer-orders" element={<EntityCustomerOrders />} />
        </Route>
      </Route>
    </Route>
  )
)