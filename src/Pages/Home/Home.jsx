import { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.4; 
    }
  }, []);
  
  return (
    <div className=" relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="../public/Video/valorant.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <Navbar/>
     
      {/* Hero Section */}

      <section className="relative flex flex-col items-center  justify-center  h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl sm:text-5xl font-bold mb-4">
          Immersive Gaming Platform
        </h1>
        <p className="text-lg sm:text-xl mb-2">Powered By Unisoft</p>
        <p className="text-sm sm:text-base max-w-2xl">
          We are experts in game Esports. Our mission is to become the most
          beloved metaverse and game Esports company.
        </p>
      </section>
    </div>
  );
}

export default Home;
