import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, Key, Shield } from 'lucide-react';
import { LuReplace } from "react-icons/lu";
import CredentialsCard from "../CredentailsCard/CredentailsCard";
import { getRoomDetails, getRoomIdp } from "../../../http";
import {
  receiveIdp,
  socketInit,
  updatedStatus,
  onlineUsers,
  leaveRoom,
  receiveSlotUpdate,
} from "../../../socket";
import CryptoJS from "crypto-js";

const CredentialsSection = ({ presentRoomData }) => {
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState(presentRoomData?.status);
  const [idpData, setIdpData] = useState({
    id: "*****",
    pass: "*****",
  });
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  const [isTimeToShow, setIsTimeToShow] = useState(false);
  const [slotData, setSlotData] = useState({});
  const [currentUserTeamId, setCurrentUserTeamId] = useState(null);
  const [userSlots, setUserSlots] = useState({});
  const [myTeamId, setMyTeamId] = useState(null);


  const { id } = useParams();

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      "your-secret-key"
    ).toString();
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, "your-secret-key");
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const saveIdpToLocalStorage = (roomId, idp) => {
    const encryptedIdp = encryptData(idp);
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // Current time + 1 day in milliseconds
    const dataWithExpiry = {
      encryptedIdp,
      expiry: expiryTime,
    };
    localStorage.setItem(`idp_${roomId}`, JSON.stringify(dataWithExpiry));
  };

  const getIdpFromLocalStorage = (roomId) => {
    let encryptedIdp = localStorage.getItem(`idp_${roomId}`);
    encryptedIdp = JSON.parse(encryptedIdp);
    if(encryptedIdp.expiry < new Date().getTime()){
      localStorage.removeItem(`idp_${roomId}`);
      return null;
    }
    if (encryptedIdp) {
      return decryptData(encryptedIdp.encryptedIdp);
    }
    return null;
  };

  const updateIdpDisplay = (newStatus, newIdp = null) => {
    if (newStatus === "Live") {
      setIsTimeToShow(true);
      if (newIdp) {
        setIdpData({
          id: newIdp.id || "N/A",
          pass: newIdp.password || "N/A",
        });
      } else {
        const localIdp = getIdpFromLocalStorage(id);
        if (localIdp) {
          setIdpData({
            id: localIdp.id || "N/A",
            pass: localIdp.password || "N/A",
          });
        }
      }
    } else {
      setIsTimeToShow(false);
      setIdpData({ id: "*****", pass: "*****" });
    }
  };

  useEffect(() => {
    console.log("Current state:", {
      myTeamId,
      allSlots: userSlots,
      mySlot: myTeamId ? userSlots[myTeamId] : null
    });
  }, [myTeamId, userSlots]);

  useEffect(() => {
    const getAllRoomData = async () => {
      try {
        const getRoomData = await getRoomDetails(id);
        const newStatus = getRoomData.data.data.status;
        setStatus(newStatus);
        updateIdpDisplay(newStatus);

        if (newStatus !== "Live") {
          const res = await getRoomIdp(id);
          const roomData = res.data.data;
          setRoom(roomData);
          saveIdpToLocalStorage(id, roomData.idp);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    getAllRoomData();
  }, [id]);

  useEffect(() => {
    console.log(presentRoomData);

    socketInit(id);

    receiveIdp((data) => {
      if (data.roomId === id) {
        saveIdpToLocalStorage(id, data);
        updateIdpDisplay(status, data);
      }
    });

    receiveSlotUpdate((data) => {
      console.log("Received slot update:", data);

      if (data.roomId === id) {
        setUserSlots((prev) => ({
          ...prev,
          "slot": data.slot,
        }));

        // If this is the first time we're getting a slot for one of our teams,
        // store that team as our team
        const isMyTeam = presentRoomData?.joinedTeam?.some(
          (team) => team.teamId === data.teamId
        );

        if (isMyTeam && !myTeamId) {
          console.log("Setting my team ID to:", data.teamId);
          setMyTeamId(data.teamId);
        }
      }
    });

    updatedStatus((data) => {
      if (data.id === id) {
        const newStatus = data.newStatus;
        setStatus(newStatus);
        updateIdpDisplay(newStatus);
      }
    });

    onlineUsers((count) => {
      setOnlineUserCount(count);
    });

    return () => {
      leaveRoom(id);
    };
  }, [id, presentRoomData, status]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="text-blue-400 w-8 h-8" />
        <h2 className="text-3xl font-bold text-white">
          Room Credentials - IDP
        </h2>
      </div>

      <div className="space-y-6">
        <CredentialsCard
          Icon={<User />}
          label="Room Id"
          value={idpData.id}
          status={status}
          isCopyEnabled={isTimeToShow}
        />
        <CredentialsCard
          Icon={<Key />}
          label="Room Password"
          value={idpData.pass}
          status={status}
          isCopyEnabled={isTimeToShow}
        />
        <CredentialsCard
          Icon={<LuReplace className="text-2xl" />}
          label="Slot"
          value={userSlots.slot || "*****"}
          status={status}
        />
      </div>

      {!isTimeToShow && (
        <p className="text-center text-white mt-16 animate-blink text-lg tracking-wider">
          Wait, the host has not entered the IDP yet.
        </p>
      )}
    </div>
  );
};

export default CredentialsSection;

