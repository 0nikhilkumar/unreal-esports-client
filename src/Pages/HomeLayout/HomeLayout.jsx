// import CustomCursor from '../../components/CustomCursor/CustomCursor'
import FAQ from '../../components/FAQ/FAQ'
import Feedback_Navbar from '../../components/Feedback_Navbar/Feedback_Navbar'
import Footer from "../../components/Footer/Footer"
import Join_Now from '../../components/Join_Now/Join_Now'
import Partners from '../../components/Partners/Partners'
import TournamentComponent from '../../components/TournamentComponent/TournamentComponent'
import Home from '../Home/Home'

function HomeLayout() {
  return (
    <>
      <div>
        <Feedback_Navbar />
        <Home />
        <Partners />
        <TournamentComponent />
        <Join_Now />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
