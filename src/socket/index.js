// import { io } from "socket.io-client";

// let socketInstance = null;

// // export const socketInit = ()=> {
// //     socketInstance = io(import.meta.env.VITE_API_URL, {
// //       auth: {
// //         token: localStorage.getItem("AccessToken"),
// //       }
// //     });
// //   return socketInstance;
// // };

// export const socketInit = (roomId)=> {
//     socketInstance = io(import.meta.env.VITE_API_URL);
//   return socketInstance;
// };

// export const reciveIDP = (eventName, cb) => {
//   socketInstance.on(eventName, cb);
// }

// export const sendIdp = (eventName, cb) => {
//   socketInstance.emit(eventName, cb);
// }

// socket.js
// import { io } from "socket.io-client";

// let socket;

// export const socketInit = () => {
//   if (!socket) {
//     socket = io("http://localhost:3000"); // Replace with your backend server URL
//   }
//   return socket;
// };

// export const sendIdp = (data) => {
//   socket.emit("room-create", data);
// };

// export const receiveIdp = (data) => {
//   socket.on("room-update", data);
// };

// export const toggleStatus = (data)=>{
//   socket.emit("toggle-status", data);
// }

// export const updatedStatus = (data)=>{
//   socket.on("updated-status", data);
// }

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

