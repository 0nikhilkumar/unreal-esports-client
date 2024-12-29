import React, { useEffect, useState } from 'react';
import { User, Key, Shield } from 'lucide-react';
import CredentialsCard from '../CredentailsCard/CredentailsCard';
import { getRoomIdp } from '../../../http';
import { useParams } from 'react-router-dom';
import { LuReplace } from "react-icons/lu";
import { receiveIdp, socketInit, updatedStatus } from '../../../socket';
import CryptoJS from 'crypto-js';

const CredentialsSection = ({presentRoomData}) => {
  const [room, setRoom] = useState(null);
  const [status, setStatus] = useState(presentRoomData?.status);
  console.log(room)
  
  const [idpData, setIdpData] = useState({
    id: "*****",
    pass: "*****",
  });

  console.log(presentRoomData)

  const [socketIdp, setSocketIdp] = useState(null); // For storing socket updates
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

  const getUpdatedIdp = async () => {
    try {
        const localIdp = getIdpFromLocalStorage(id);
        if (localIdp) {
            setIdpData(localIdp);
            setRoom({ ...room, idp: localIdp });
            const currentTime = new Date();
            const roomTime = new Date();
            roomTime.setHours(presentRoomData?.time.split(':')[0], presentRoomData?.time.split(':')[1], 0);
            const timeDifference = (currentTime - roomTime) / 60000; // difference in minutes
            if (timeDifference >= 10) {
                // Show password
                console.log("Password: ", localIdp.password);
            }
        } else {
            const res = await getRoomIdp(id);
            const roomData = res.data.data;
            setRoom(roomData);
            saveIdpToLocalStorage(id, roomData.idp);
            checkTimeRemaining(new Date().setHours(roomData?.time.split(':')[0], roomData?.time.split(':')[1], 0));
            const currentTime = new Date();
            const roomTime = new Date();
            roomTime.setHours(roomData?.time.split(':')[0], roomData?.time.split(':')[1], 0);
            const timeDifference = (currentTime - roomTime) / 60000; // difference in minutes
            if (timeDifference >= 10) {
                // Show password
                console.log("Password: ", roomData.idp.password);
            }
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
      if (socketIdp) {
        // Use socket IDP if available
        setIdpData({
          id: socketIdp.id || "N/A",
          pass: socketIdp.password || "N/A",
        });
      } else if (room?.idp) {
        // Fallback to room IDP
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
      // socketInit();
  
      // Listen for 'statusUpdated' event
      const handleStatusUpdate = (data) => {
        if (data.id === presentRoomData?._id) {
          
        }
      };
  
      // Attach the socket listener
      updatedStatus(handleStatusUpdate);
  
    }, [presentRoomData?._id]);

  useEffect(() => {
    getUpdatedIdp(); 
    const interval = setInterval(() => {
      if (presentRoomData?.time) {
        checkTimeRemaining(new Date().setHours(presentRoomData.time.split(':')[0], room.time.split(':')[1], 0));
      }
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup interval
  }, [room?.time]); // Trigger when room time changes

  socketInit()
  useEffect(() => {
    receiveIdp((data) => {
      setSocketIdp(data); // Store socket data
      if (data) {
        setIdpData({
          id: data.id || "N/A",
          pass: data.password || "N/A",
        });
        saveIdpToLocalStorage(id, data);
      }
    });
  }, []); // Run only once when the component mounts

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
          value={idpData.id || room?.idp?.id}
          isCopyEnabled={isTimeToShow}
        />
        <CredentialsCard
          Icon={<Key />}
          label="Room Password"
          value={idpData.pass || room?.idp?.password} 
          isCopyEnabled={isTimeToShow}
        />
        <CredentialsCard
          Icon={<LuReplace className="text-2xl" />}
          label="Slot"
          value={isTimeToShow ? room?.slot || "N/A" : "*****"}
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
