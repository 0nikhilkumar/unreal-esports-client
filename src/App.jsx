import Error from "@/components/Error/Error";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Arena from "./components/Arena/Arena";
import FeedbackForm from "./components/Feedback Form/FeedbackForm";
import HostingRoom from "./components/HostingRoom/HostingRoom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import About from "./Pages/About/About";
import HomeLayout from "./Pages/HomeLayout/HomeLayout";
import CreateTournament from "./Pages/PlayArea/CreateTournament/CreateTournament";
import Leaderboard from "./Pages/PlayArea/Leaderboard/Leaderboard";
import Profile from "./Pages/Profile/Profile";
import CreateRoom from "./Pages/Tournament/CreateRoom/CreateRoom";
import Tournament from "./Pages/Tournament/Tournament";
import store from "./Store";
import UserRoom from "./UserRoom/UserRoom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />} errorElement={<Error />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
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
    </>
  )
);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
