import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getAllUserJoinedRooms } from "../../http";
import { socketInit, updatedStatus } from "../../socket";
import Card from "./Card/Card";
import Loader from "../../components/Loader/Loader";

function JoinedRooms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedButton, setSelectedButton] = useState("T3");
  const [allRooms, setAllRooms] = useState(null);
  const [loading, setLoading] = useState(false)

  // console.log(allRooms)

  const searchInputRef = useRef(null);

  const filteredRooms = allRooms?.filter(
    (room) => room.tier === selectedButton
  );

  const filteredData = filteredRooms?.filter((room) =>
    room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  async function userJoinedRoom() {
    setLoading(true)
    const res = await getAllUserJoinedRooms();
    if(res.data.statusCode === 200){
      setAllRooms(res.data.data);
      setLoading(false)
    }
  }

  useEffect(() => {
    socketInit();

    const handleStatusUpdate = (data) => {
      setAllRooms((prevRooms) =>
        prevRooms.map((room) =>{
          if(room._id === data.id){
            // console.log(data);
          }
        })
      );
      // console.log(data);
    };
    updatedStatus(handleStatusUpdate);
  }, []);

  useEffect(() => {
    userJoinedRoom();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  if(loading) return <Loader/>

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Main Content */}
      <div className="relative w-full max-w-6xl px-2 py-6 mx-auto">
        {/* Header Section with Banner Image */}
        <div className="relative w-full md:h-96 h-72  mb-8">
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-2xl sm:text-6xl font-bold text-white uppercase tracking-wider">
              Your Joined Rooms
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex justify-center space-x-6 md:ml-6">
            <button
              onClick={() => setSelectedButton("T3")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T3"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}>
              T3
            </button>
            <button
              onClick={() => setSelectedButton("T2")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T2"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}>
              T2
            </button>
            <button
              onClick={() => setSelectedButton("T1")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T1"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 transition duration-300`}>
              T1
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-sm my-10 relative">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search Bar"
              className="w-full p-3 pl-10 pr-20 rounded-lg border bg-gray-800 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <CiSearch size={20} />
            </span>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              (Ctrl + K)
            </span>
          </div>
        </div>

        {/* Section based on selected button */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 mb-20">
            {filteredData?.map((room) => (
              <Card
                room={room}
                key={room._id}
                canEnter={new Date(room.time) - new Date() <= 35 * 60 * 1000}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinedRooms;
