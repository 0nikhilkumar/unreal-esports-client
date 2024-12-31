import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUpdateIdp } from "../../http";
import toast from "react-hot-toast";
import { sendIdp, socketInit, toggleStatus, onlineUsers, leaveRoom } from "../../socket";

function RoomIdp({ idpData, setIdpData, setGetResponse }) {
  const [isEdit, setIsEdit] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [roomPass, setRoomPass] = useState("");
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const socket = socketInit(id);
    onlineUsers((count) => {
      setOnlineUserCount(count);
    });

    return () => {
      leaveRoom(id);
    };
  }, [id]);

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
    
    const updatedData = { id: roomId, password: roomPass, roomId: id };
    setIdpData(updatedData);
    sendIdp(updatedData);
    setIsEdit(false);
  };

  const handleEdit = () => {
    setRoomId(idpData?.id || "");
    setRoomPass(idpData?.password || "");
    setIsEdit(true);
  };

  const handleToggleStatus = () => {
    const newStatus = idpData.status === 'active' ? 'inactive' : 'active';
    const statusData = { roomId: id, status: newStatus };
    toggleStatus(statusData);
    setIdpData({ ...idpData, status: newStatus });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-8 w-full mt-5 text-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {!idpData || isEdit ? "Enter Room IDP" : "Room IDP"}
      </h2>

      <div>
        {!idpData || isEdit ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Room ID"
            />
            <input
              type="text"
              placeholder="Room Password"
              value={roomPass}
              onChange={(e) => setRoomPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              aria-label="Room Password"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleEdit}
              className="mb-4 bg-gray-200 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-300 transition-colors duration-300"
            >
              Edit
            </button>
            <p className="text-lg">
              Room ID: <span className="font-semibold text-blue-500">{idpData.id}</span>
            </p>
            <p className="text-lg">
              Room Password: <span className="font-semibold text-blue-500">{idpData.password}</span>
            </p>
            <button
              onClick={handleToggleStatus}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Toggle Status ({idpData.status})
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-lg">Online Users in this room: {onlineUserCount}</p>
    </div>
  );
}

export default RoomIdp;

