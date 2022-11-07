import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/home";
import Login from "../pages/login";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<AuthLayout />}>
        <Route path="" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Route>
  )
)