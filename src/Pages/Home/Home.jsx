import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const [hamburger, setHamburger] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const [isMuted, setIsMuted] = useState(true); // State to track mute status
  const [isDark, setIsDark] = useState(false);

  function handleHamburger() {
    setHamburger(!hamburger);
  }

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
      videoRef.current.playbackRate = 1;
      videoRef.current.muted = !isMuted; // Toggle the muted property of the video
      setIsMuted(!isMuted);
      setIsDark(!isDark); // Toggle dark effect
    }
  };

  return (
    <div className=" relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
      ref={videoRef}
      src="/Video/video.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          width: "100%",
          height: "auto",
          filter: isDark ? "brightness(50%)" : "none", // Dark effect using CSS filter
          transition: "filter 0.3s ease", // Smooth transition
        }}
      >
        <source src="/Video/video.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Navbar  */}

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
