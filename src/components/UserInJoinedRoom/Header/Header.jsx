import React from 'react';
import { Trophy } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-12">
      <Trophy className="text-yellow-500 w-12 h-12" />
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-center">
        Esports Tournament Hub
      </h1>
    </div>
  );
};

export default Header;