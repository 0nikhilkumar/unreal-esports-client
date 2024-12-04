// import CustomCursor from '../../components/CustomCursor/CustomCursor'
import Partners from '../../components/Partners/Partners'
import TournamentComponent from '../../components/TournamentComponent/TournamentComponent'
import Join_Now from '../../components/Join_Now/Join_Now'
import FAQ from '../../components/FAQ/FAQ'
import Home from '../Home/Home'
import Footer from "../../components/Footer/Footer"

function HomeLayout() {
  return (
    <>
      {/* <CustomCursor /> */}
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
