import { io } from "socket.io-client";

let socket;

export const socketInit = (roomId) => {
  if (!socket) {
    socket = io("http://localhost:3000"); // Replace with your backend server URL
  }
  if (roomId) {
    socket.emit('join-room', roomId);
  }
  return socket;
};

export const sendIdp = (data) => {
  socket.emit("room-create", data);
};

export const receiveIdp = (callback) => {
  socket.on("room-update", callback);
};

export const toggleStatus = (data) => {
  socket.emit("toggle-status", data);
};

export const updatedStatus = (callback) => {
  socket.on("updated-status", callback);
};

export const onlineUsers = (callback) => {
  socket.on("online-users", callback);
};

export const leaveRoom = (roomId) => {
  socket.emit('leave-room', roomId);
};

export const sendSlotUpdate = (data) => {
  socket.emit("slot-update", data);
};

export const receiveSlotUpdate = (data) => {
  socket.on("slot-updated", data);
};
