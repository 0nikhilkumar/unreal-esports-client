// import CustomCursor from '../../components/CustomCursor/CustomCursor'
import Partners from '../../components/Partners/Partners'
import TournamentComponent from '../../components/TournamentComponent/TournamentComponent'
import Join_Now from '../../components/Join_Now/Join_Now'
import FAQ from '../../components/FAQ/FAQ'
import Home from '../Home/Home'
import Footer from "../../components/Footer/Footer"
import Feedback_Navbar from '../../components/Feedback_Navbar/Feedback_Navbar'
import { Toaster } from 'react-hot-toast'

function HomeLayout() {
  return (
    <>
      {/* <CustomCursor /> */}
      
      {/* Feedback Navbar */}
      <Feedback_Navbar/>
      <Home />
      <Partners />
      <TournamentComponent />
      <Join_Now />
      <FAQ />
      <Footer/>
    </>
  );
}

export default HomeLayout;
