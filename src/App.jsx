import Error from "@/components/Error/Error";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Arena from "./components/Arena/Arena";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import HostingRoom from "./components/HostingRoom/HostingRoom";
import HostRoom from "./components/HostRoom/HostRoom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { checkHostAuthentication, checkUserAuthentication } from "./http";
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

// const ProtectedRoute = ({Component}) => {
//   const {user, isAuth} = useSelector((state)=> state.auth);
//   const navigate = useNavigate();
//   useEffect(()=> {
//     !isAuth ? navigate("/login") : isAuth && user?.isVerified ? navigate("/") : <Component />
//   }, [isAuth, navigate, user?.isVerified])
//   return <Component />
// }

// const SemiProtected = ({Component}) => {
//   const {user, isAuth} = useSelector((state)=> state.auth);
//   const navigate = useNavigate();
//   useEffect(()=> {
//     !isAuth ? navigate("/") : isAuth && user?.isVerified ? (<Component />) : navigate("/")
//   }, [isAuth, navigate, user?.activated])
//   return <Component />
// }

// const GuestRoute = ({ Component }) => {
//   const { isAuth } = useSelector((state) => state.auth);
//   console.log(isAuth);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (isAuth) {
//       navigate("/");
//     }
//   }, [navigate, isAuth]);
//   return isAuth ? null : <Component />;
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<HomeLayout />} errorElement={<Error />} />
      <Route path="/signup" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/tournament" element={<Tournament />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/hosting-room" element={<HostingRoom />} />
      <Route path="/hosting-tournament" element={<CreateTournament />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/arena" element={<Arena />} />
      <Route path="/arena/:id" element={<UserRoom />} />
      <Route path="/hosting-room/:id" element={<HostRoom />} />
      <Route path="/joined-rooms" element={<JoinedRooms />} />
      <Route path="/joined-rooms/:id" element={<Room />} />
    </>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("_unreal_esports_uuid");
      const encryptVisibility = localStorage.getItem("_unreal_esports_visibliltiy")
      let decryptVisibility;
      if(encryptVisibility){
        decryptVisibility = decryptData(encryptVisibility)
      }
      console.log(decryptVisibility)
      if (!token || !decryptVisibility) {
        console.log("No token found");
        return;
      }

      if(decryptVisibility === "user"){
        const getData = await checkUserAuthentication();
        if (getData.data.isAuthenticated && getData.status === 200) {
          dispatch(setAuth({ isAuth: getData.data.isAuthenticated , role:decryptVisibility}));
        }
      }
      else {
        const getData = await checkHostAuthentication();
        if (getData.data.isAuthenticated && getData.status === 200) {
          dispatch(setAuth({ isAuth: getData.data.isAuthenticated , role:decryptVisibility}));
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
      <Toaster position="top-right" toastOptions={{ duration: 5000 }} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
