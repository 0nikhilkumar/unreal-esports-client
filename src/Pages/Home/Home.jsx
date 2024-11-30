import React from "react";

function Home() {
  return (
    <>
       <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="../public/Video/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-5 bg-black bg-opacity-0 text-white">
          <div className="text-xl font-bold">Logo</div>
          <div className="space-x-4">
            <a href="#home" className="hover:text-gray-300">
              Home
            </a>
            <a href="#about" className="hover:text-gray-300">
              About
            </a>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Immersive AAA Games
          </h1>
          <p className="text-lg md:text-xl mb-2">Powered by Unreal Engine</p>
          <p className="text-sm md:text-base max-w-2xl">
            We are experts in blockchain and game publishing. Our mission is to
            become the most beloved metaverse and game publishing company.
          </p>
        </section>
      </div>
    </>
  );
}

export default Home;
