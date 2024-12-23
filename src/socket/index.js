import { io } from "socket.io-client";

let socketInstance = null;

// export const socketInit = ()=> {
//     socketInstance = io(import.meta.env.VITE_API_URL, {
//       auth: {
//         token: localStorage.getItem("AccessToken"),
//       }
//     });
//   return socketInstance;
// };
export const socketInit = (roomId)=> {
    socketInstance = io(import.meta.env.VITE_API_URL);
  return socketInstance;
};

export const reciveIDP = (eventName, cb) => {
  socketInstance.on(eventName, cb);
}

export const sendIdp = (eventName, cb) => {
  socketInstance.emit(eventName, cb);
}

