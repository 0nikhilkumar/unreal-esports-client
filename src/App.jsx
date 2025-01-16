import Error from "@/components/Error/Error";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Arena from "./components/Arena/Arena";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import HostingRoom from "./components/HostingRoom/HostingRoom";
import HostRoom from "./components/HostRoom/HostRoom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import {
  checkHostAuthentication,
  checkUserAuthentication,
} from "./http";
import About from "./Pages/About/About";
import HomeLayout from "./Pages/HomeLayout/HomeLayout";
import JoinedRooms from "./Pages/JoinedRoom/JoinedRooms";
import Room from "./Pages/JoinedRoom/Room/Room";
import CreateTournament from "./Pages/PlayArea/CreateTournament/CreateTournament";
import Leaderboard from "./Pages/PlayArea/Leaderboard/Leaderboard";
import Profile from "./Pages/Profile/UserProfile/Profile";
import CreateRoom from "./Pages/Tournament/CreateRoom/CreateRoom";
import Tournament from "./Pages/Tournament/Tournament";
import { setAuth } from "./Store/authSlice";
import { decryptData } from "./Store/crypto";
import UserRoom from "./UserRoom/UserRoom";
import StorageChangeHandler from "./AutoLogout";
import Loader from "./components/Loader/Loader";
import * as Sentry from "@sentry/react";


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("_unreal_esports_uuid");

  return token ? element : <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<HomeLayout />} errorElement={<Error />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/loader" element={<Loader />} />
      <Route path="/about" element={<ProtectedRoute element={<About />} />} />
      <Route
        path="/tournament"
        element={<ProtectedRoute element={<Tournament />} />}
      />
      <Route
        path="/feedback"
        element={<FeedbackForm />}
      />
      <Route
        path="/create-room"
        element={<ProtectedRoute element={<CreateRoom />} />}
      />
      <Route
        path="/hosting-room"
        element={<ProtectedRoute element={<HostingRoom />} />}
      />
      <Route
        path="/hosting-tournament"
        element={<ProtectedRoute element={<CreateTournament />} />}
      />
      <Route
        path="/leaderboard"
        element={<ProtectedRoute element={<Leaderboard />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />}
      />
      <Route path="/arena" element={<ProtectedRoute element={<Arena />} />} />
      <Route
        path="/arena/:id"
        element={<ProtectedRoute element={<UserRoom />} />}
      />
      <Route
        path="/hosting-room/:id"
        element={<ProtectedRoute element={<HostRoom />} />}
      />
      <Route
        path="/joined-rooms"
        element={<ProtectedRoute element={<JoinedRooms />} />}
      />
      <Route
        path="/joined-rooms/:id"
        element={<ProtectedRoute element={<Room />} />}
      />
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("_unreal_esports_uuid");
      const encryptVisibility = localStorage.getItem(
        "_unreal_esports_visibliltiy"
      );
      let decryptVisibility;
      if (encryptVisibility) {
        decryptVisibility = decryptData(encryptVisibility);
      }

      if (!token || !decryptVisibility) {
        return;
      }

      if (decryptVisibility === "user") {
        const getData = await checkUserAuthentication();
        if (getData.data.isAuthenticated && getData.status === 200) {
          dispatch(
            setAuth({
              isAuth: getData.data.isAuthenticated,
              role: decryptVisibility,
            })
          );
        }
      } else {
        const getData = await checkHostAuthentication();
        if (getData.data.isAuthenticated && getData.status === 200) {
          dispatch(
            setAuth({
              isAuth: getData.data.isAuthenticated,
              role: decryptVisibility,
            })
          );
        }
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Sentry.ErrorBoundary fallback={<div>An error occurred!</div>}>
      <StorageChangeHandler />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <RouterProvider router={router} />
    </Sentry.ErrorBoundary>
  );
};

export default App;
