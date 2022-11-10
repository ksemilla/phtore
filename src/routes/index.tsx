import EntityAdmin from "@/pages/entityAdmin";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import BaseLayout from "../layouts/BaseLayout";
import Home from "../pages/home";
import Login from "../pages/login";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<BaseLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/:entity">
        <Route path="admin" element={<AuthLayout />}>
          <Route path="" element={<EntityAdmin />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
)