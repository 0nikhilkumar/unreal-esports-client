import Footer from '@/components/Footer/Footer.jsx';
import Home from "@/Pages/Home/Home";
import CustomCursor from './components/CustomCurson';
import Join_Now from './components/Join_Now/Join_Now';
import Partners from './components/Partners/Partners';
import TournamentComponent from './components/Tournament/TournamentComponent';
import FAQ from './components/FAQ/FAQ';
const App = () => {
  return (
    <>
    <CustomCursor />
    <Home/>
    <Partners/>
    <TournamentComponent />
    <Join_Now/>
    <FAQ/>
    <Footer/>
    </>
  );
};

export default App;