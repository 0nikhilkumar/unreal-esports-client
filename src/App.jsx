import Footer from '@/components/Footer/Footer.jsx'
import Home from "@/Pages/Home/Home";
import Partners from './components/Partners/Partners'
import Join_Now from './components/Join_Now/Join_Now';
import Tournament from './Pages/Tournament/Tournament';
const App = () => {
  return (
    <>
    <Home/>
    <Partners/>
    <Tournament />
    <Join_Now/>
    <Footer/>
    </>
  );
};

export default App;