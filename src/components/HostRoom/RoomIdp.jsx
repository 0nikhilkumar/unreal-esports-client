import React, { useState } from "react";
import { getUpdateIdp } from "../../http";
import toast from "react-hot-toast";
import {socketInit} from "../../socket";

function RoomIdp({ idpData, setIdpData, id, setGetResponse }) {
  const [isEdit, setIsEdit] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomPass, setRoomPass] = useState("");

  const socket = socketInit();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idpData?.id === roomId && idpData?.password === roomPass) {
      toast.error("No Updates");
      return;
    }

    const res = await getUpdateIdp(id, roomId, roomPass);
    if (res.data.success) {
      setGetResponse(true);
      toast.success("Idp change successfully");
    }
    
    const updatedData = { id: roomId, password: roomPass };
    setIdpData(updatedData);
    socket.emit("room-create", updatedData); // Emit socket event

    setIsEdit(false);
  };

  const handleEdit = () => {
    setRoomId(idpData?.id || "");
    setRoomPass(idpData?.password || "");
    setIsEdit(true);
  };

  return (
    <div className="bg-gray-800  rounded-lg shadow-md p-8 w-full mt-5 text-white">
      {/* Title */}
      <h2 className="text-2xl font-semibold text-center mb-6">
        {!idpData || isEdit ? "Enter Room IDP" : "Room IDP"}
      </h2>

      {/* Form or Display */}
      <div>
        {!idpData || isEdit ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room ID Input */}
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Room ID"
            />

            {/* Room Password Input */}
            <input
              type="text"
              placeholder="Room Password"
              value={roomPass}
              onChange={(e) => setRoomPass(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Room Password"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Edit Button */}
            <button
              onClick={handleEdit}
              className="mb-4 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors duration-300">
              Edit
            </button>

            {/* Display Room ID */}
            <p className="text-lg">
              Room ID:{" "}
              <span className="font-semibold text-blue-500">{idpData.id}</span>
            </p>

            {/* Display Room Password */}
            <p className="text-lg">
              Room Password:{" "}
              <span className="font-semibold text-blue-500">
                {idpData.password}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default RoomIdp;
