import Error from "@/components/Error/Error";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import StorageChangeHandler from "./AutoLogout";
import Arena from "./components/Arena/Arena";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import HostingRoom from "./components/HostingRoom/HostingRoom";
import HostRoom from "./components/HostRoom/HostRoom";
import Loader from "./components/Loader/Loader";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { checkHostAuthentication, checkUserAuthentication } from "./http";
import About from "./Pages/About/About";
import HomeLayout from "./Pages/HomeLayout/HomeLayout";
import JoinedRooms from "./Pages/JoinedRoom/JoinedRooms";
import Room from "./Pages/JoinedRoom/Room/Room";
import ManageTeams from "./Pages/ManageTeams/ManageTeams";
import CreateTournament from "./Pages/PlayArea/CreateTournament/CreateTournament";
import Leaderboard from "./Pages/PlayArea/Leaderboard/Leaderboard";
import HostProfile from "./Pages/Profile/HostProfile/HostProfile";
import UserProfile from "./Pages/Profile/UserProfile/UserProfile";
import CreateRoom from "./Pages/Tournament/CreateRoom/CreateRoom";
import Tournament from "./Pages/Tournament/Tournament";
import Wallet from "./Pages/wallet/Wallet";
import { setAuth } from "./Store/authSlice";
import { decryptData } from "./Store/crypto";
import UserRoom from "./UserRoom/UserRoom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("_unreal_esports_uuid");
  return token ? element : <Navigate to="/" />;
};

const Profile = () => {
  const visibility = decryptData(
    localStorage.getItem("_unreal_esports_visibliltiy")
  );

  if (visibility === "user") return <UserProfile />;
  else if (visibility === "host") return <HostProfile />;
  else return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<HomeLayout />} errorElement={<Error />} />{" "}
      //done👍
      <Route path="/signup" element={<Signup />} /> //done👍
      <Route exact path="/login" element={<Login />} /> //done👍
      <Route exact path="/loader" element={<Loader />} />
      <Route path="/about" element={<ProtectedRoute element={<About />} />} />
      <Route
        path="/tournament"
        element={<ProtectedRoute element={<Tournament />} />} //no need
      />
      <Route path="/feedback" element={<FeedbackForm />} /> //done👍
      <Route
        path="/create-room"
        element={<ProtectedRoute element={<CreateRoom />} />} // no need
      />
      <Route
        path="/hosting-room"
        element={<ProtectedRoute element={<HostingRoom />} />} //done👍
      />
      <Route
        path="/hosting-tournament"
        element={<ProtectedRoute element={<CreateTournament />} />} // no need
      />
      <Route
        path="/leaderboard"
        element={<ProtectedRoute element={<Leaderboard />} />} // done👍
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<Profile />} />} //HostingProfile && UserProfile Done👍
      />
      <Route path="/arena" element={<ProtectedRoute element={<Arena />} />} />{" "} //Done👍
      
      <Route
        path="/arena/:id"
        element={<ProtectedRoute element={<UserRoom />} />} //Done👍
      />{" "}
      
      <Route
        path="/hosting-room/:id"
        element={<ProtectedRoute element={<HostRoom />} />} //Done👍
      />
      <Route
        path="/joined-rooms"
        element={<ProtectedRoute element={<JoinedRooms />} />} //Done👍
      />
      <Route
        path="/joined-rooms/:id"
        element={<ProtectedRoute element={<Room />} />} //Done👍
      />
      <Route
        path="/manage-teams"
        element={<ProtectedRoute element={<ManageTeams />} />} // Done👍
      />
      <Route path="/wallet" element={<ProtectedRoute element={<Wallet />} />} />
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
        if (decryptVisibility === "host") {
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
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <StorageChangeHandler />
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
