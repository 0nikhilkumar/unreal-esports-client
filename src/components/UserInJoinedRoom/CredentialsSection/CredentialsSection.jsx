import React from 'react';
import { User, Key, Shield } from 'lucide-react';
import CredentialsCard from '../CredentailsCard/CredentailsCard';


const CredentialsSection = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="text-blue-400 w-8 h-8" />
        <h2 className="text-3xl font-bold text-white">
          Room Credentials - IDP
        </h2>
      </div>

      <div className="space-y-6">
        <CredentialsCard
          // Icon={<User />}
          label="Room Id"
          value="15499336652"
        />
        <CredentialsCard
          // Icon={<Key />}
          label="Room Password"
          value="••••••••"
        />
      </div>
      <p className="text-center text-white mt-16 animate-blink text-lg tracking-wider">
        Wait, the host has not entered the IDP yet.
      </p>
    </div>
  );
};

export default CredentialsSection;