import React from "react";

 function InfoItem({ icon, label, value, className }) {
  return (
    <div
      className={`flex items-center space-x-3 bg-gray-800/50 rounded-xl p-3 hover:bg-gray-700/50 transition-colors duration-300 ${className}`}
    >
      {/* Icon */}
      <div className="text-xl text-cyan-400">{icon}</div>

      {/* Label and Value */}
      <div>
        <span className="text-gray-400 text-sm">{label}</span>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default InfoItem