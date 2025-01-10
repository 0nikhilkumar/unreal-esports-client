import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-r-4 border-yellow-500 animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="images/logo-fav.png" 
            alt="Loading" 
            className="w-24 h-24 object-contain animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
