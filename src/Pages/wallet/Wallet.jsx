import React, { useState } from "react";

const WalletPage = () => {
  // State to hold the number of coins
  const [coins, setCoins] = useState(0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Wallet</h1>
        <div className="flex flex-col items-center">
          <p className="text-lg text-gray-600 mb-4">You have</p>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-yellow-100">
            <p className="text-3xl font-semibold text-yellow-500">{coins}</p>
          </div>
          <p className="text-lg text-gray-600 mt-4">coins in your wallet</p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => setCoins(coins + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Add Coin
          </button>
          <button
            onClick={() => setCoins(coins > 0 ? coins - 1 : 0)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Remove Coin
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
