import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";

const CreateRoom = ({handleRoomAdded}) => {
  const [formData, setFormData] = useState({
    id: nanoid(),
    name: "Apna Room",
    date: "",
    startTime: "14:35",
    endTime: "15:35",
    prize: "10000",
    status: "Open",
    game: "BGMI",
    maxPlayers: "20",
    image: null,
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = { ...formData, id: nanoid() };
    // setRooms([...rooms, newRoom]);
    handleRoomAdded(newRoom);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black bg-transparent">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create Room</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Room Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Time:</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Prize Pool (in $):
            </label>
            <input
              type="number"
              name="prize"
              value={formData.prize}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Game Name:</label>
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum Players:
            </label>
            <input
              type="number"
              name="maxPlayers"
              value={formData.maxPlayers}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-2">Upload Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
