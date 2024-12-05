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
import About from "./Pages/About/About";
import Tournament from "./Pages/Tournament/Tournament";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route path="" element={<HomeLayout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/tournament" element={<Tournament />} />
      <Route path="/feedback" element={<FeedbackForm />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
