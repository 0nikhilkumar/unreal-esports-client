import { useRef, useState } from "react";
import { Link } from "react-router-dom";

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
      <nav className="absolute top-0 left-0 w-full flex p-5 bg-black bg-opacity-0 text-white justify-around items-center z-40">
        <div className="text-xl font-bold">Logo</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Nikhil
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            Chutiya
          </Link>
          <Link to="/schedule" className="hover:text-gray-300">
            Hai
          </Link>
          <Link to="/faq" className="hover:text-gray-300">
            Kya tu
          </Link>
          <button onClick={toggleAudio}>{isMuted ? "UnMute" : "Mute"}</button>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            className="text-xl hover-text-gray-300 focus:outline-none"
            onClick={handleHamburger}
          >
            ☰
          </button>
        </div>
      </nav>

     
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
