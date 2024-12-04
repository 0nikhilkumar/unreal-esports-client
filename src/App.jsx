import Footer from '@/components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
const App = () => {
  return (
    <>
    {/* <Navbar/> */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  );
};

export default App;