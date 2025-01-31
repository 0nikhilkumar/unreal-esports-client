import React, { useEffect, useState } from 'react';
import Header from '../../../components/UserInJoinedRoom/Header/Header';
import CredentialsSection from '../../../components/UserInJoinedRoom/CredentialsSection/CredentialsSection';
import { socketInit, updatedStatus } from '../../../socket';
import { useNavigate, useParams } from 'react-router-dom';
import { getRoomDetails, getUserTeam } from '../../../http';
import Loader from '../../../components/Loader/Loader';

const Room = () => {
  const [status, setStatus] = useState('Offline');
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [presentRoomData, setPresentRoomData] = useState(null);
  const [showClosedMessage, setShowClosedMessage] = useState(false);
  const roomId = useParams().id;
  const navigate = useNavigate();
  const [isRoomClosed, setIsRoomClosed] = useState(false);
  const [loading, setLoading] = useState(false);
  let length = 0;


  useEffect(() => {
    socketInit();

    const handleStatusUpdate = (data) => {
      if (data.id === roomId) {
        if (data.newStatus === 'Closed') {
          setIsRoomClosed(true); // Mark room as closed
          setStatus('Offline'); // Ensure status stays Offline
          setShowClosedMessage(true); // Show the closed room message
          setTimeout(() => {
            navigate('/joined-rooms'); // Redirect after 3 seconds
          }, 2000);
        }
      }
    };

    updatedStatus(handleStatusUpdate);

  }, [roomId, navigate]);

  const getRoom = async () => {
    setLoading(true)
    const res = await getRoomDetails(roomId);
    if(res.data.statusCode === 200){
      setPresentRoomData(res.data.data);
      setLoading(false)
    }
  };

  useEffect(() => {
    getRoom();
  }, [roomId]);

  const dateAndTime = `${presentRoomData?.date}T${presentRoomData?.time}:00`;
  const roomStartTime = new Date(dateAndTime);
  // roomStartTime.setHours(presentRoomData?.time.split(':')[0], presentRoomData?.time.split(':')[1], 0);


  useEffect(() => {

    if (isRoomClosed) return; // Prevent status updates if the room is closed
    socketInit()
    const timer = setInterval(() => {
      const currentTime = new Date();
      const diff = roomStartTime - currentTime;

      if (diff <= 0) {
        setStatus('Live');
        // toggleStatus({id:roomId, newStatus:"Live"})
        setTimeRemaining(null);
        clearInterval(timer);
      } else if (diff <= 30 * 60 * 1000) {
        setStatus('Room starts in:');
        setTimeRemaining(diff);
      } else {
        setStatus('Offline');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [roomStartTime, isRoomClosed]); // Dependency includes isRoomClosed

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if(loading) return <Loader/>

  return (
    <div className="min-h-screen w-fit sm:w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-8">
        <Header />
        <div>
          <CredentialsSection presentRoomData={presentRoomData} />
        </div>
      </div>

      <div className="fixed bottom-4 left-4 flex items-center space-x-3 bg-gray-800 text-white p-3 rounded-lg shadow-lg">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'Live' ? 'bg-green-500' : 'bg-gray-500'
          }`}
        ></div>
        <div className="text-sm sm:text-base">
          {status === 'Room starts in:' && timeRemaining ? (
            <>
              {status} <span className="font-bold">{formatTime(timeRemaining)}</span>
            </>
          ) : (
            status
          )}
        </div>
      </div>

      {/* Full-Screen Closed Room Message */}
      {showClosedMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <h1 className="text-white text-3xl font-bold">
            This room has been closed by the host.
          </h1>
        </div>
      )}
    </div>
  );
};

export default Room;
