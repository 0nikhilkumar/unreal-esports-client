import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import App from "@/App";
import Error from "@/components/Error/Error";
import Signup from "./components/Signup/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeLayout from "./Pages/HomeLayout/HomeLayout";
import Login from "./components/Login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="" element={<HomeLayout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
