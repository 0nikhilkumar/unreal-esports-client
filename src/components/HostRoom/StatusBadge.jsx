import React from "react";

 function StatusBadge({ status, onlineUserCount }) {
  // Determine if the status is considered "open"
  const isOpen =
    status === "Open" ||
    status === "Registration Open" ||
    status === "Coming Soon" ||
    onlineUserCount >= 0

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${onlineUserCount >= 0?"":"uppercase"} tracking-wider ${
        isOpen
          ? "bg-green-500/20 text-green-400 border border-green-500"
          : "bg-red-500/20 text-red-400 border border-red-500"
      }`}
    >
      {status?status:`${onlineUserCount >= 0 ? onlineUserCount : 0} Online`}
    </span>
  );
}

export default StatusBadge