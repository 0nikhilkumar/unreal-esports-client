import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, Key, Shield } from 'lucide-react';
import { LuReplace } from "react-icons/lu";
import CredentialsCard from '../CredentailsCard/CredentailsCard';
import { getRoomDetails, getRoomIdp } from '../../../http';
import { receiveIdp, socketInit, updatedStatus, onlineUsers, leaveRoom } from '../../../socket';
import CryptoJS from 'crypto-js';

const CredentialsSection = ({presentRoomData}) => {
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState(presentRoomData?.status);
  const [idpData, setIdpData] = useState({
    id: "*****",
    pass: "*****",
  });
  const [onlineUserCount, setOnlineUserCount] = useState(0);
  const [socketIdp, setSocketIdp] = useState(null);
  const [isTimeToShow, setIsTimeToShow] = useState(false);

  const { id } = useParams();

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'your-secret-key').toString();
  };

  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, 'your-secret-key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const saveIdpToLocalStorage = (roomId, idp) => {
    const encryptedIdp = encryptData(idp);
    localStorage.setItem(`idp_${roomId}`, encryptedIdp);
  };

  const getIdpFromLocalStorage = (roomId) => {
    const encryptedIdp = localStorage.getItem(`idp_${roomId}`);
    if (encryptedIdp) {
      return decryptData(encryptedIdp);
    }
    return null;
  };

  useEffect(() => {
    const getAllRoomData = async () => {
      const getRoomData = await getRoomDetails(id);
      setStatus(getRoomData.data.data.status);
    }
    getAllRoomData();
  }, [id]);

  const roomDateAndTime = `${presentRoomData?.date}T${presentRoomData?.time}:00`;

  const getUpdatedIdp = async () => {
    try {
      const localIdp = getIdpFromLocalStorage(id);
      console.log(localIdp)
      if (localIdp) {
        setIdpData({id:localIdp.id,pass:localIdp.pass});
        setRoom({ ...room, idp: localIdp });
        checkTimeRemaining(new Date(roomDateAndTime))
      } else {
        const res = await getRoomIdp(id);
        console.log(res.data)
        const roomData = res.data.data;
        console.log(roomData)
        setRoom(roomData);
        saveIdpToLocalStorage(id, roomData.idp);
        checkTimeRemaining(new Date(roomDateAndTime));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkTimeRemaining = (startTime) => {
    const now = new Date();
    const timeDifference = (new Date(startTime) - now) / 1000 / 60;

    if (timeDifference <= 10) {
      setIsTimeToShow(true);
      setStatus('Live')
      if (socketIdp) {
        setIdpData({
          id: socketIdp.id || "N/A",
          pass: socketIdp.password || "N/A",
        });
      } else if (room?.idp) {
        setIdpData({
          id: room.idp.id || "N/A",
          pass: room.idp.password || "N/A",
        });
      }
    } else {
      setIsTimeToShow(false);
      setIdpData({ id: "*****", pass: "*****" });
    }
  };

  useEffect(() => {
    const socket = socketInit(id);
    
    receiveIdp((data) => {
      if (data.roomId === id) {
        setSocketIdp(data);
        setIdpData({
          id: data.id || "N/A",
          pass: data.password || "N/A",
        });
        saveIdpToLocalStorage(id, data);
      }
      console.log("receiveidp",data)
    });

    updatedStatus((data) => {
      if (data.id === id) {
        setStatus(data.newStatus);
      }
      console.log("updatedstatus",data)
    });

    onlineUsers((count) => {
      setOnlineUserCount(count);
    });

    return () => {
      leaveRoom(id);
    };
  }, [id]);

  useEffect(() => {
    getUpdatedIdp(); 
    const interval = setInterval(() => {
      if (presentRoomData?.time) {
        checkTimeRemaining(new Date().setHours(presentRoomData.time.split(':')[0], presentRoomData.time.split(':')[1], 0));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [presentRoomData?.time]);

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
          value={isTimeToShow ? room?.slot || "N/A" : "*****"}
          status={status}
        />
      </div>

      {!isTimeToShow && (
        <p className="text-center text-white mt-16 animate-blink text-lg tracking-wider">
          Wait, the host has not entered the IDP yet.
        </p>
      )}
      {/* <p className="mt-4 text-lg text-white">Online Users in this room: {onlineUserCount}</p> */}
    </div>
  );
};

export default CredentialsSection;

