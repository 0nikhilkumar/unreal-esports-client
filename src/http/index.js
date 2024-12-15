import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true
});


export const signUpUser = (data) => api.post("/user/signup", data, {withCredentials: true});
export const signUpHost = (data) => api.post("/host/register", data, {withCredentials: true});


export const loginUser = (data) => api.post("/user/login", data, {withCredentials: true});
export const loginHost = (data) => api.post("/host/login", data, {withCredentials: true});

export const logoutUser = () => api.get("/user/logout", {withCredentials: true});
export const logoutHost = () => api.get("/host/logout", {withCredentials: true});

export const createRooms = (data) => {
    const transformedData = {
        roomName: data.name,
        date: data.date,
        time: `${data.startTime}`,
        gameName: data.game,
        maxTeam: data.maxPlayers,
        status: data.status,
        tier: data.tier,
        prize: data.prize
      };
      console.log(transformedData);
    return api.post("/rooms/create-room", transformedData, {withCredentials: true});
}
export const getHostRooms = () => api.get("/rooms/get-host-rooms", {withCredentials: true});