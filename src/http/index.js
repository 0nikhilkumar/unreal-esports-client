import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
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

export const createRooms = (data) => api.post("/rooms/create-room", data, {headers: {
    "Content-Type": "multipart/form-data"
}, withCredentials: true});

export const getHostRooms = () => api.get("/rooms/get-host-rooms", {withCredentials: true});

export const getUserHostRooms = () => api.get("/rooms/getHostRoom");

export const getRoom = (id) => api.get(`/rooms/get-room/${id}`,{withCredentials:true})

export const getUpdateIdp = (id,roomId,roomPass) => api.patch(`/rooms/update-idp/${id}`,{roomId,roomPass},{withCredentials:true})

export const getIdp = (id) => api.get(`/rooms/user-get-idp/${id}`, {withCredentials:true})

export const getPreferredNameData = () => api.get("/rooms/get-preferredName");

export const getAllRoomsOfHost = (id) => api.get(`/rooms/getAllHostRooms/${id}`);

export const userJoinRoom = (id) => api.patch("/user/join-room", {id});

export const getAllUserJoinedRooms = () => api.get("/user/joined-rooms");

export const createTeam = (teamName, players) => api.post("/user/create-team", {teamName, players});

export const getUserTeam = () => api.get("/user/get-team");

export const updateUserTeam = (teamName, players) => api.patch("/user/update-team", {teamName, players});

