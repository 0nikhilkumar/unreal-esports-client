import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { dummyData } from "../components/Arena/dummyData";
import Card from "../components/Card/Card";

const roomData = [
  {
    roomName: "Revolutionize Intuitive Info-Mediaries",
    date: "2024-08-25",
    time: "19:36:47",
    prize: "254933",
    capacity: "76",
    type: "COD Mobile",
    tier: "T1",
    status: "Closed",
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    roomName: "Envisioneer Rich Solutions",
    date: "2024-04-23",
    time: "06:59:57",
    prize: "144242",
    capacity: "46",
    type: "Apex Legends",
    tier: "T3",
    status: "Closed",
    image: "https://picsum.photos/200/300?random=2",
  },
  {
    roomName: "Re-Contextualize Efficient Technologies",
    date: "2024-05-01",
    time: "02:00:10",
    prize: "224311",
    capacity: "99",
    type: "PUBG",
    tier: "T1",
    status: "Upcoming",
    image: "https://picsum.photos/200/300?random=3",
  },
  {
    roomName: "Innovate Global E-Markets",
    date: "2024-05-20",
    time: "03:08:32",
    prize: "465272",
    capacity: "12",
    type: "BGMI",
    tier: "T2",
    status: "Live",
    image: "https://picsum.photos/200/300?random=4",
  },
  {
    roomName: "Generate Bricks-And-Clicks Roi",
    date: "2024-09-15",
    time: "15:43:21",
    prize: "116845",
    capacity: "30",
    type: "BGMI",
    tier: "T1",
    status: "Closed",
    image: "https://picsum.photos/200/300?random=5",
  },
  {
    roomName: "Syndicate Wireless Web Services",
    date: "2024-11-18",
    time: "15:25:43",
    prize: "225001",
    capacity: "69",
    type: "FreeFire",
    tier: "T2",
    status: "Live",
    image: "https://picsum.photos/200/300?random=6",
  },
  {
    roomName: "Visualize Dot-Com Schemas",
    date: "2024-01-27",
    time: "12:37:29",
    prize: "178176",
    capacity: "99",
    type: "PUBG",
    tier: "T3",
    status: "Upcoming",
    image: "https://picsum.photos/200/300?random=7",
  },
  {
    roomName: "Cultivate Wireless Applications",
    date: "2024-09-12",
    time: "04:38:07",
    prize: "27027",
    capacity: "51",
    type: "Apex Legends",
    tier: "T1",
    status: "Live",
    image: "https://picsum.photos/200/300?random=8",
  },
  {
    roomName: "Aggregate Bleeding-Edge Systems",
    date: "2024-09-29",
    time: "19:36:27",
    prize: "121270",
    capacity: "45",
    type: "FreeFire",
    tier: "T2",
    status: "Upcoming",
    image: "https://picsum.photos/200/300?random=9",
  },
  {
    roomName: "Unleash One-To-One Web-Readiness",
    date: "2024-10-29",
    time: "19:27:59",
    prize: "193552",
    capacity: "67",
    type: "BGMI",
    tier: "T1",
    status: "Live",
    image: "https://picsum.photos/200/300?random=10",
  },
];

function UserRoom() {
  const [selectedButton, setSelectedButton] = useState("T3");
  const [searchQuery, setSearchQuery] = useState("");

  const { id } = useParams();
  let data = dummyData.filter((prevData) => prevData.id === Number(id))[0];

  // Filter roomData based on selected tier
  const filteredRooms = roomData.filter((room) => room.tier === selectedButton);

  // Filter roomData based on search query
  const filteredData = filteredRooms.filter((room) =>
    room.roomName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchInputRef = useRef(null);

  // Focus on the search bar when Ctrl + K is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus(); // Focus on the input
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-6xl px-2 py-6">
        {/* Header Section with Banner Image */}
        <div className="relative w-full h-96 mb-8">
          <img
            src={data.img}
            alt={data.preferredName}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-white uppercase tracking-wider hover:bg-white hover:text-black hover:p-5 hover:rounded-lg cursor-pointer transition duration-200">
              {data.preferredName}
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex justify-center m-auto space-x-6 sm:space-x-4 md:space-x-6 md:mt-20 md:ml-12 md:my-4 md:mb-32">
            <button
              onClick={() => setSelectedButton("T3")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T3"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              T3
            </button>
            <button
              onClick={() => setSelectedButton("T2")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T2"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              T2
            </button>
            <button
              onClick={() => setSelectedButton("T1")}
              className={`py-3 px-8 rounded-full text-white font-bold ${
                selectedButton === "T1"
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 shadow-xl"
                  : "bg-gray-600"
              } hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              T1
            </button>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-md my-4 mt-20 mb-32 relative sm:max-w-xs">
            <input
              type="text"
              ref={searchInputRef}
              placeholder="Search Bar"
              className="w-full p-3 pl-10 pr-20 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none"
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
            {filteredData.map((room, index) => (
              <Card
                roomName={room.roomName}
                capacity={room.capacity}
                date={room.date}
                image={room.image}
                prize={room.prize}
                status={room.status}
                tier={room.tier}
                time={room.time}
                type={room.type}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRoom;
