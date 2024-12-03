import { useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  // const [hamburger, setHamburger] = useState(false);
  const videoRef = useRef(null); // Reference to the video element
  const [isMuted, setIsMuted] = useState(true); // State to track mute status
  const [isDark, setIsDark] = useState(false);

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
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        src="/Video/video1.mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          filter: isDark ? "brightness(50%)" : "none", // Dark effect using CSS filter
          transition: "filter 0.3s ease", // Smooth transition
        }}></video>

      {/* Fade Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none"></div> */}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>

      {/* Navbar */}
      <Navbar toggleAudio={toggleAudio} isMuted={isMuted} />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center  h-full bg-black bg-opacity-50 text-center text-white px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
          LevelUp Gaming Platform
        </h1>
        <div className="flex flex-row sm:flex-row md:flex-row justify-center items-center mt-3">
          <span className="h-px w-12 sm:w-16 bg-blue-500 sm:block"></span>
          <p className="text-2xl flex flex-col justify-center items-center gap-2 sm:text-3xl md:text-4xl sm:flex-row md:flex-row lg:text-5xl mx-4 font-bold text-center group">
            <span className="text-red-700">Unreal</span>{" "}
            <span className="bg-red-600 rounded-xl px-3 py-1 pb-3">
              Esports
            </span>
          </p>
          <span className="h-px w-12 sm:w-16 bg-blue-500 sm:block"></span>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-lg md:max-w-2xl bg-black bg-opacity-30 p-3 rounded-md mt-4">
          We are experts in game Esports. Our mission is to become the most
          beloved metaverse and game Esports company.
        </p>
      </section>
    </div>
  );
}

export default Home;
