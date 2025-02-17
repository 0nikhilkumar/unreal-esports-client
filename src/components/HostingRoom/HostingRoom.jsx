import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { createRooms, deleteRoomCard, getHostRooms } from "../../http";
import Loader from "../Loader/Loader";
import { TiDelete } from "react-icons/ti";
import ConfirmationDialog from "./ConfirmationDialog";
import ImageUpload from "./ImageUpload";

function HostingRoom() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState("T3");
  const searchInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [roomNameToDelete, setRoomNameToDelete] = useState(""); // Added state for room name
  const [formData, setFormData] = useState({
    image: "",
    roomName: "",
    date: "",
    time: "",
    maxTeam: "",
    prize: "",
    status: "",
    gameName: "",
    gameMap: "",
    tier: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store the file object in formData
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMapChange = (e) => {
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

    try {
      const res = await createRooms(formData);
      toast.success(res.data.message);
      setRefreshData(!refreshData);
      setFormData({
        roomName: "",
        date: "",
        time: "",
        maxTeam: "",
        prize: "",
        status: "",
        image: "",
        gameName: "",
        gameMap: "",
        tier: "",
      });
      toggleModal();
    } catch (error) {
      toast.error("Room is not created");
    }
  };

  // Add this new function
  const initiateDeleteRoom = (roomId, roomName) => {
    setRoomToDelete(roomId);
    setRoomNameToDelete(roomName);
    setShowDeleteConfirm(true);
  };

  // Modify the existing handleDeleteRoom function
  const handleDeleteRoom = async () => {
    if (!roomToDelete) return;

    setLoading(true);
    try {
      const res = await deleteRoomCard(roomToDelete);
      setShowDeleteConfirm(false);
      setRoomToDelete(null);
      setRoomNameToDelete(null); //Added to clear the room name after deletion
      setRefreshData(!refreshData);
      toast.success("Room deleted successfully");
    } catch (error) {
      toast.error("Failed to delete room");
    } finally {
      setLoading(false);
    }
  };

  const fetchedData = async () => {
    setLoading(true);
    const res = await getHostRooms();
    if (res.data.statusCode === 200) {
      setPlayers(res.data.message[0].roomDetails);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchedData();
  }, [refreshData]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-5">
      {/* Header */}
      <div className="text-center text-2xl sm:text-4xl font-semibold pt-8 sm:pt-10 tracking-widest mb-6 sm:mb-10">
        <h1>Your Rooms</h1>
        <span className="block h-1 bg-blue-500 w-20 sm:w-28 mx-auto mt-2 rounded"></span>
      </div>

      {/* Create Room Button */}
      <div className="flex flex-wrap justify-end items-center mb-4 sm:mb-5 gap-3 sm:gap-4">
        <button
          onClick={toggleModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-3 sm:px-4 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <GoPlus className="text-xl sm:text-2xl" />
          <p>Create Room</p>
        </button>
      </div>

      {/* Main Section */}
      <div className="flex flex-wrap justify-between items-center gap-3 sm:gap-4">
        {/* Left Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {["T3", "T2", "T1"].map((tier) => (
            <button
              key={tier}
              className={`py-1 sm:py-2 px-4 sm:px-6 rounded text-sm sm:text-base ${
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
        <div className="relative w-full sm:max-w-md mt-3 sm:mt-0">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search by Game Name"
            className="w-full p-2 sm:p-3 pl-8 sm:pl-10 pr-16 sm:pr-20 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none shadow-lg text-sm sm:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <CiSearch size={18} />
          </span>
          <span className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
            (Ctrl + K)
          </span>
        </div>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
        {filteredData.map((room, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl overflow-hidden transition-transform hover:transform hover:scale-105"
          >
            <div className="relative">
              <span>
                <TiDelete
                  className="absolute top-2 right-2 text-xl sm:text-2xl cursor-pointer"
                  onClick={() => initiateDeleteRoom(room._id, room.roomName)}
                />
              </span>

              <NavLink to={`/hosting-room/${room._id}`}>
                <img
                  src={room.image || "/placeholder.svg"}
                  alt={room.roomName}
                  className="w-full h-40 sm:h-48 object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1542751371-adc38448a05e";
                  }}
                />
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {room.roomName}
                    </h3>
                    <div className="text-xs sm:text-sm bg-white text-black rounded px-2 sm:px-3 py-1">
                      {room.gameMap || "Erangle"}
                    </div>
                  </div>
                  <div className="flex justify-start gap-x-3 sm:gap-x-5 items-center flex-wrap">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-300 mb-2 text-xs sm:text-sm">
                      <FaUsers />
                      <span>Date: {room.date}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-300 mb-2 text-xs sm:text-sm">
                      <FaUsers />
                      <span>Time: {room.time}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-300 mb-2 text-xs sm:text-sm">
                      <FaUsers />
                      <span>Prize: {room.prize}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-300 mb-2 text-xs sm:text-sm">
                      <FaUsers />
                      <span>Capacity: {room.maxTeam}</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-300 mb-2 text-xs sm:text-sm">
                      <FaGamepad />
                      <span>{room.gameName}</span>
                    </div>
                  </div>
                  <div
                    className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
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
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div
            className="relative w-full max-w-xs sm:max-w-md bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="tracking-wider pl-2 text-lg sm:text-xl">
                Create Room
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 sm:w-8 sm:h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              className="p-3 sm:p-4 max-h-[60vh] sm:max-h-[70vh] overflow-hidden overflow-y-scroll no-scrollbar"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* <ImageUpload /> */}

              {/* Form fields */}
              <div className="grid gap-3 sm:gap-4 mb-6 sm:mb-10 grid-cols-1 sm:grid-cols-2">
                {/* Room Name */}
                <div className="col-span-1">
                  <label
                    htmlFor="roomName"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    name="roomName"
                    id="roomName"
                    value={formData.roomName}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Room Name"
                    required
                  />
                </div>
                {/* Map */}
                <div className="col-span-1">
                  <label
                    htmlFor="Map"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Map
                  </label>
                  <select
                    name="gameMap"
                    value={formData.gameMap}
                    onChange={handleMapChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select</option>
                    <option aria-required value="Erangel">
                      Erangel
                    </option>
                    <option aria-required value="Miramar">
                      Miramar
                    </option>
                    <option aria-required value="Vikendi">
                      Vikendi
                    </option>
                    <option aria-required value="Sanhok">
                      Sanhok
                    </option>
                  </select>
                </div>

                {/* Date */}
                <div className="col-span-1">
                  <label
                    htmlFor="date"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>

                {/* Time */}
                <div className="col-span-1">
                  <label
                    htmlFor="time"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  />
                </div>

                {/* Max Team */}
                <div className="col-span-1">
                  <label
                    htmlFor="maxTeam"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Max Team Size
                  </label>
                  <input
                    type="number"
                    name="maxTeam"
                    id="maxTeam"
                    value={formData.maxTeam}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Max Team Size"
                    required
                  />
                </div>

                {/* Prize Pool */}
                <div className="col-span-1">
                  <label
                    htmlFor="prize"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Prize
                  </label>
                  <input
                    type="number"
                    name="prize"
                    id="prize"
                    value={formData.prize}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Prize Pool"
                    required
                  />
                </div>

                {/* Status */}
                <div className="col-span-1">
                  <label
                    htmlFor="status"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select</option>
                    <option aria-required value="Open">
                      Open
                    </option>
                    <option aria-required value="Closed">
                      Closed
                    </option>
                    <option aria-required value="Live">
                      Live
                    </option>
                  </select>
                </div>

                {/* Game Name */}
                <div className="col-span-1">
                  <label
                    htmlFor="gameName"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Game Name
                  </label>
                  <input
                    type="text"
                    name="gameName"
                    id="gameName"
                    value={formData.gameName}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter Game Name"
                    required
                  />
                </div>

                {/* Tier */}
                <div className="col-span-1">
                  <label
                    htmlFor="tier"
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Tier
                  </label>
                  <select
                    name="tier"
                    value={formData.tier}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 sm:p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    className="block mb-1 sm:mb-2 text-sm sm:text-lg text-start font-medium text-gray-900 dark:text-white"
                  >
                    Image Upload
                  </label>
                  <input
                    onChange={handleImageChange}
                    className="block w-full text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-primary-600 focus:border-primary-600 p-1 sm:p-[6.2px] dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteRoom}
        message={`Are you sure you want to delete the room "${roomNameToDelete}"?`}
      />
    </div>
  );
}

export default HostingRoom;
