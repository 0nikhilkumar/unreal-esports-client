import React, { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { LuAsterisk } from "react-icons/lu";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { createRooms, getHostRooms } from "../../http";
import toast from "react-hot-toast";

const dummyData = [
  {
    id: 1,
    roomName: "Room 1",
    date: "2024-12-14",
    time: "10:00 AM",
    maxTeam: 10,
    image: "/images/Games/BGMI.webp",
    prizePool: 500,
    status: "Open",
    gameName: "Valorant",
    tier: "T3",
  },
  {
    id: 2,
    roomName: "Room 2",
    date: "2024-12-15",
    time: "12:00 PM",
    maxTeam: 8,
    image: "/images/Games/BGMI.webp",
    prizePool: 300,
    status: "Live",
    gameName: "CS:GO",
    tier: "T2",
  },
  {
    id: 3,
    roomName: "Room 3",
    date: "2024-12-16",
    time: "2:00 PM",
    maxTeam: 12,
    image: "/images/Games/BGMI.webp",
    prizePool: 1000,
    status: "Closed",
    gameName: "Dota 2",
    tier: "T1",
  },
];

function HostingRoom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("T3");
  const searchInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamCreated, setTeamCreated] = useState(false);
  const [players, setPlayers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [formData, setFormData] = useState({
    roomName: "",
    date: "",
    time: "",
    maxTeam: "",
    prize: "",
    status: "",
    gameName: "",
    tier: "",
  });

  const handleImageChange = (e) => {
    // const file = e.target.files[0] // Get the selected file
    // if (file) {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     image: file, // Store the file object in formData
    //   }));
    // }
    console.log("hi2");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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

  const filteredData = players.filter(
    (card) =>
      card.tier === selectedTier &&
      card.gameName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setPlayers((prev) => [...prev, formData]);
    console.log("Form Data:", formData);

    try {
      const res = await createRooms(formData);
      console.log("res", res);
      // console.log(res.data);
      toast.success(res.data.message);
      setRefreshData(!refreshData);
      console.log(formData)
      setFormData({
        roomName: "",
        date: "",
        time: "",
        maxTeam: "",
        prize: "",
        status: "",
        gameName: "",
        tier: "",
      });
      toggleModal();
    } catch (error) {
      toast.error("Room is not created");
    }
  };

  const fetchedData = async () => {
    const res = await getHostRooms();
    setPlayers(res.data.message[0].roomDetails);
  };

  useEffect(() => {
    fetchedData();
  }, [refreshData]);



  return (
    <div className="min-h-screen bg-black text-white p-5">
      <div className="text-center text-4xl font-semibold pt-10 tracking-widest mb-10">
        <h1>Your Rooms</h1>
        <span className="block h-1 bg-blue-500 w-28 mx-auto mt-2 rounded"></span>
      </div>

      {/* create room  */}
      <div className="flex flex-wrap justify-end items-center mb-5 gap-4 ">
        <button
          onClick={toggleModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          <GoPlus className="text-2xl" />
          <p>Create Room</p>
        </button>
      </div>

      {/* Main Section */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Left Buttons */}
        <div className="flex flex-wrap gap-4">
          {["T3", "T2", "T1"].map((tier) => (
            <button
              key={tier}
              className={`py-2 px-6 rounded ${
                selectedTier === tier
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              {tier}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search by Game Name"
            className="w-full p-3 pl-10 pr-20 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none shadow-lg"
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

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredData.map((room, index) => (
          
          <div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
          >
            <NavLink to={`/hosting-room/${room._id}`}>
            <img
              src={room.image}
              alt={room.roomName}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1542751371-adc38448a05e";
              }} 
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{room.roomName}</h3>
              <div className="flex justify-start gap-x-5 items-center flex-wrap">
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaUsers />
                  <span>Date: {room.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaUsers />
                  <span>Time: {room.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaUsers />
                  <span>Prize: {room.prize}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaUsers />
                  <span>Capacity: {room.maxTeam}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <FaGamepad />
                  <span>{room.gameName}</span>
                </div>
              </div>
              <div
                className={`inline-block px-3 py-1 rounded-full text-sm ${
                  room.status === "Open" ||
                  room.status === "Registration Open" ||
                  room.status === "Coming Soon"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-red-500/20 text-red-500"
                }`}
              >
                {room.status}
              </div>
            </div>
            </NavLink>
          </div>
          
        ))}
      </div>

      {/*  */}

      <div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div
              className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="tracking-wider pl-2">Create Room</h3>

                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <form
                className="p-4 max-h-[70vh] overflow-hidden overflow-y-scroll no-scrollbar"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                {/* Form fields */}
                <div className="grid gap-4 mb-10 grid-cols-2 ">
                  {/* Room Name */}
                  <div className="col-span-2">
                    <label
                      htmlFor="roomName"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Room Name
                    </label>
                    <input
                      type="text"
                      name="roomName"
                      id="roomName"
                      value={formData.roomName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Room Name"
                      required
                    />
                  </div>

                  {/* Date */}
                  <div className="col-span-1">
                    <label
                      htmlFor="date"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white "
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="col-span-1">
                    <label
                      htmlFor="time"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Max Team */}
                  <div className="col-span-1">
                    <label
                      htmlFor="maxTeam"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Max Team Size
                    </label>
                    <input
                      type="number"
                      name="maxTeam"
                      id="maxTeam"
                      value={formData.maxTeam}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Max Team Size"
                      required
                    />
                  </div>

                  {/* Prize Pool */}
                  <div className="col-span-1">
                    <label
                      htmlFor="prize"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Prize
                    </label>
                    <input
                      type="number"
                      name="prize"
                      id="prize"
                      value={formData.prize}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Prize Pool"
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select</option>
                      <option aria-required value="Open">
                        Open
                      </option>
                      <option aria-required value="Closed">
                        Closed
                      </option>
                    </select>
                  </div>

                  {/* Game Name */}
                  <div className="col-span-1">
                    <label
                      htmlFor="gameName"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Game Name
                    </label>
                    <input
                      type="text"
                      name="gameName"
                      id="gameName"
                      value={formData.gameName}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Enter Game Name"
                      required
                    />
                  </div>

                  {/* Tier */}
                  <div className="col-span-1">
                    <label
                      htmlFor="tier"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Tier
                    </label>
                    <select
                      name="tier"
                      value={formData.tier}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option>Select</option>
                      <option value="T3">T3</option>
                      <option value="T2">T2</option>
                      <option value="T1">T1</option>
                    </select>
                  </div>

                  {/* Image URL */}
                  <div className="col-span-1">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-lg text-start font-medium text-gray-900 dark:text-white"
                    >
                      Image Upload
                    </label>
                    <input
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  focus:ring-primary-600 focus:border-primary-600  p-[6.2px]  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create Room
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/*  */}
    </div>
  );
}

export default HostingRoom;
