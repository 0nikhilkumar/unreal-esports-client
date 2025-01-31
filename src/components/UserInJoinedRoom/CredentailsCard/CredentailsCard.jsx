import React, { useState } from 'react';
import { User, Key, Clipboard, Check } from 'lucide-react';


const CredentialsCard = ({ label, value ,Icon, isCopyEnabled, status}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group bg-gray-900/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
            {/* {label === "Room Id" ? (
              <User className="text-blue-400 w-6 h-6" />
            ) : (
              <Key className="text-blue-400 w-6 h-6" />
            )} */}
            <div className='text-blue-400 w-6 h-6'>{Icon}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
            <p className="text-xl text-white font-semibold tracking-wide">{ status === "Open" ? "N/A": value}</p>
          </div>
        </div>

        <button
          disabled={isCopyEnabled}
          onClick={handleCopy}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 rounded-lg transition-all duration-300"
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Copied</span>
            </>
          ) : (
            <>
              <Clipboard className="w-4 h-4" />
              <span className="text-sm font-medium">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CredentialsCard;