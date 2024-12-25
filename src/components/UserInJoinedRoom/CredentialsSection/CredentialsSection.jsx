import React, { useEffect, useState } from 'react';
import { User, Key, Shield } from 'lucide-react';
import CredentialsCard from '../CredentailsCard/CredentailsCard';
import { getIdp } from '../../../http';
import { useParams } from 'react-router-dom';
import { LuReplace } from "react-icons/lu";

const CredentialsSection = () => {
  const [room, setRoom] = useState(null);
  const [idpData, setIdpData] = useState({
    id: "*****",
    pass: "*****",
  });
  const [isTimeToShow, setIsTimeToShow] = useState(false);

  const { id } = useParams();
  // const [year, month, day] = room?.date.split('-');
  // const [hours, minute] = room?.time.split(':');

  const getUpdatedIdp = async () => {
    const res = await getIdp(id);
    // console.log(room);
    const roomData = res.data.data;
    // console.log(roomData);
    setRoom(roomData);
    checkTimeRemaining(new Date().setHours(roomData.time.split(':')[0], roomData.time.split(':')[1], 0)); 
  };

  const checkTimeRemaining = (startTime) => {
    const now = new Date();
    const timeDifference = (new Date(startTime) - now) / 1000 / 60; 
    if (timeDifference <= 10) {
      setIsTimeToShow(true);
      setIdpData({ id: room?.idp?.id || "N/A", pass: room?.idp?.password || "N/A" });
    } else {
      setIsTimeToShow(false);
      setIdpData({ id: "*****", pass: "*****" });
    }
  };

  useEffect(() => {
    getUpdatedIdp();

    // Check every minute for time updates
    const interval = setInterval(() => {
      if (room?.time) {
        checkTimeRemaining(new Date().setHours(roomData.time.split(':')[0], roomData.time.split(':')[1], 0));
      }
    }, 60000); // Check every 1 minute

    return () => clearInterval(interval); 
  }, []);

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
          isCopyEnabled={isTimeToShow} // Pass to enable copy button
        />
        <CredentialsCard
          Icon={<Key />}
          label="Room Password"
          value={idpData.pass}
          isCopyEnabled={isTimeToShow} // Pass to enable copy button
        />
        <CredentialsCard
          Icon={<LuReplace className='text-2xl' />}
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
