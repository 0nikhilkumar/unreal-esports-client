import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import App from '@/App'
import Home from '@/Pages/Home/Home'
import Error from '@/components/Error/Error'
import About from '@/Pages/About/About'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} errorElement={<Error/>}>
      <Route path="" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
