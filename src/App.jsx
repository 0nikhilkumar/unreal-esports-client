// import Footer from '@/components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
    <Toaster position='top-right' toastOptions={{duration:3000}}/>
    {/* <Navbar/> */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  );
};

export default App;