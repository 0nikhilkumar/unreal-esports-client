import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
  
});

export const sendOTPToEmail = (email, username) => api.post("/user/send-otp-to-email", { email, username });
export const signUpUser = (data) => api.post("/user/signup", data, { withCredentials: true });

export const signUpHost = (data) => api.post("/host/register", data, { withCredentials: true });

// credentials includes cookies
export const loginUser = (data) => api.post("/user/login", data, { withCredentials: true, credentails: "include" });
export const loginHost = (data) => api.post("/host/login", data, { withCredentials: true, credentails: "include" });


export const logoutUser = () => api.get("/user/logout", { withCredentials: true });
export const logoutHost = () => api.get("/host/logout", { withCredentials: true });

export const getUserProfile = () => api.get("/user/get-user-profile");
export const getHostProfile = () => api.get("/host/get-host-profile");

export const updateUserProfile = (data) => api.patch("/user/update-user-profile", data)
export const updateHostProfile = (data) => api.patch("/host/update-host-profile", data)

export const createRooms = (data) => api.post("/rooms/create-room", data, {headers: {"Content-Type": "multipart/form-data"},withCredentials: true});

export const getHostRooms = () => api.get("/rooms/get-host-rooms", { withCredentials: true });

export const getUserHostRooms = () => api.get("/rooms/getHostRoom");

export const getRoom = (id) => api.get(`/rooms/get-room/${id}`, { withCredentials: true });

export const getRoomDetails = (id) => api.get(`/user/get-room/${id}`, { withCredentials: true });

export const getUpdateIdp = (id, roomId, roomPass) => api.patch(`/rooms/update-idp/${id}`,{ roomId, roomPass },{ withCredentials: true });

export const getIdp = (id) => api.get(`/rooms/get-idp/${id}`, { withCredentials: true });

export const updateStatus = (id, status) => api.patch(`/rooms/update-status/${id}`,{ status },{ withCredentials: true });

export const getRoomIdp = (id) => api.get(`/rooms/user-get-idp/${id}`, { withCredentials: true });

export const getPreferredNameData = () => api.get("/rooms/get-preferredName");

export const getAllRoomsOfHost = (id) => api.get(`/rooms/getAllHostRooms/${id}`);

export const userJoinRoom = (id) => api.patch("/user/join-room", { id });

export const getAllUserJoinedRooms = () => api.get("/user/joined-rooms");

export const createTeam = (teamName, players) => api.post("/user/create-team", { teamName, players });

export const getUserTeam = () => api.get("/user/get-team");

export const updateUserTeam = (teamName, players) => api.patch("/user/update-team", { teamName, players });

export const updateSocialMedia = (data) => api.patch("/user/update-socialMedia-links", data);
export const getSocialMedia = () => api.get("/user/get-socialMedia-links");

export const updateHostSocialMedia = (data) => api.patch("/host/update-host-socialMedia-links", data);
export const getHostSocialMedia = () => api.get("/host/get-host-socialMedia-links");

export const updateUserTeamSlot = (id, teams) => api.patch(`/host/update-slot/${id}`, { teams });

export const updateLeaderboardApi = (id, leaderboardData) => api.patch(`/host/update-leaderboard/${id}`, { leaderboardData });

export const hostGetLeaderboardData = (id) => api.get(`/host/get-leadboard-data/${id}`);

export const checkUserAuthentication = () => api.get("/user/check-auth");
export const checkHostAuthentication = () => api.get("/host/check-auth");

export const getLeaderboardData = (roomId) => api.post("/user/get-leaderboard-data",{roomId});

export const updateTierForHost = ({teamId, newTier}) => api.patch("/host/joined-teams",{teamId, newTier});

export const getUpdateTierFor = () => api.get("/host/joined-teams");

export const deleteRoomCard = (id) => api.delete(`/host/delete-room/${id}`);

export const checkUsername = (username) => api.get(`/user/check-username?username=${username}`);

export const checkHostUsername = (username) => api.get(`/host/check-host-username?username=${username}`);

export const sendOtpToEmailForForgotPassword = (email) => api.post("/user/send-otp-for-forgot-password", {email}, { withCredentials: true });
export const verifyOtpForForgotPassword = (data) => api.post("/user/verify-otp-for-forgot-password", data);
export const forgotPassword = (data) => api.patch("/user/forgot-password", data);

export const sendOtpToHostEmailForForgotPassword = (email) => api.post("/host/send-otp-for-forgot-password", email);
export const verifyOtpForHostForgotPassword = (data) => api.post("/host/verify-otp-for-forgot-password", data);
export const forgotHostPassword = (data) => api.patch("/host/forgot-password", data);
