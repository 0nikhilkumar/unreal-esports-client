import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Squares from "../../Design/Square";
import DecryptedText from '../../Design/DecryptedText';

function Home() {
  
  const [direction, setDirection] = useState("diagonal");
  const containerRef = useRef(null);

  const directions = {
    up: "up",
    down: "down",
    right: "right",
    left: "left",
    diagonal: "dig"
  };

  

  useEffect(() => {
    const directionKeys = Object.keys(directions);
    let index = 0;

    const interval = setInterval(() => {
      setDirection(directions[directionKeys[index]]);
      index = (index + 1) % directionKeys.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0D1717]">
      
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      
      <div className="relative z-20">
        <Navbar/>
      </div>

      <section className="relative flex flex-col items-center justify-center h-full text-center text-white px-4 z-10">
        <div className="absolute inset-0 z-0">
          <Squares
            speed={0.06}
            maxIterations={10}
            squareSize={100}
            sequential={true}
            direction={direction}
            borderColor="rgba(255, 255, 255, 0.1)"
            hoverFillColor="rgba(255, 255, 255, 0.08)"
          />
        </div>

        <div 
          ref={containerRef} 
          
          style={{ height: '300px' }} 
          className="relative z-10 flex justify-center items-center flex-col gap-4"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wide">
          <DecryptedText
            text="LevelUp Gaming Platform"
            speed={100}
            maxIterations={20}
            animateOn="view"
            sequential
          />
            {/* LevelUp Gaming Platform */}
          </h1>
          <div className="flex flex-row justify-center items-center mt-3">
            <span className="hidden sm:block h-px w-12 sm:w-16 bg-blue-500"></span>
            <p className="text-2xl flex flex-col sm:flex-row items-center gap-2 sm:text-3xl md:text-4xl lg:text-5xl mx-4 font-bold text-center group">
              <span className="text-red-700">Unreal</span>
              <span className="bg-red-600 rounded-xl px-3 py-1 pb-2 sm:pb-3">
                Esports
              </span>
            </p>
            <span className="hidden sm:block h-px w-12 sm:w-16 bg-blue-500"></span>
          </div>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-lg md:max-w-2xl border border-red-700 bg-gray-950 p-3 rounded-md mt-4">
            We are experts in game Esports. Our mission is to become the most
            beloved metaverse and game Esports company.
          </p>
        </div>
      </section>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black pointer-events-none z-10"></div>
    </div>
  );
}

export default Home;