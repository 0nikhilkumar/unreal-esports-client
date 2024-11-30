import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [hamburger, setHamburger] = useState(false);


  return (
    <div className=" relative h-screen w-full overflow-hidden">
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="../public/Video/demo.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Navbar  */}
      <nav className="absolute top-0 left-0 w-full flex p-5 bg-black bg-opacity-0 text-white justify-around items-center">
        <div className="text-xl font-bold">Logo</div>
        <div className="hidden md:flex space-x-4">
          <Link to={'/'} className="hover:text-gray-300">
            Home
          </Link>
          <Link to={'/about'} className="hover:text-gray-300">
            About
          </Link>
          <Link to={"/tournament"} className="hover:text-gray-300">
            Tournament
          </Link>
          <Link to={"/faq"} className="hover:text-gray-300">
             FAQ
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            className="text-xl hover-text-gray-300 focus:outline-none"
            onClick={()=>setHamburger(!hamburger)}
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
