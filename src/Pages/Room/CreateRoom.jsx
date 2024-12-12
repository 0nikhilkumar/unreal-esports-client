import { useState } from "react";
import PropTypes from "prop-types";
const CreateRoom = ({ handleRoomAdded, handleRoomShow }) => {
  const [formData, setFormData] = useState({
    id: 10,
    roomName: "Room 10",
    date: new Date().toISOString().split("T")[0],
    startTime: "19:00",
    endTime: "21:00",
    prizePool: 5500,
    GameName: "Omaha",
    maxPlayers: 35,
    image: "https://picsum.photos/300/200",
    tier: 1,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRoomAdded(formData);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-black bg-transparent">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create Room</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium mb-2">Room Name:</label>
            <input
              type="text"
              name="roomName"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, roomName: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Time:
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={(e) => {
                setFormData({ ...formData, startTime: e.target.value });
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, endTime: e.target.value });
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, prize: e.target.value });
              }}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tier:</label>
            <select
              name="Tier"
              value={formData.tier}
              onChange={(e) => {
                setFormData({ ...formData, tier: e.target.value });
              }}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="Open">1</option>
              <option value="Close">2</option>
              <option value="Close">3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Game Name:</label>
            <input
              type="text"
              name="game"
              value={formData.game}
              onChange={(e) => {
                setFormData({ ...formData, game: e.target.value });
              }}
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
              onChange={(e) => {
                setFormData({ ...formData, maxPlayers: e.target.value });
              }}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="col-span-full">
            <label className="block text-sm font-medium mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  image: URL.createObjectURL(e.target.files[0]),
                });
              }}
              className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="col-span-full flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mr-2"
              onClick={() => handleRoomShow()}
            >
              Cancel
            </button>
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
CreateRoom.propTypes = {
  handleRoomAdded: PropTypes.func,
  handleRoomShow: PropTypes.func,
};
export default CreateRoom;
