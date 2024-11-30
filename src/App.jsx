import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
const App = () => {
  return (
    <>
    <Outlet/>
    <Footer/>
    </>
  );
};

export default App;
