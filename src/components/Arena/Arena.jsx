import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { dummyData } from "./dummyData";
import { LuAsterisk } from "react-icons/lu";
import {createTeam, getPreferredNameData, getUserTeam, updateUserTeam} from "../../http/index"
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const UserRoom = () => {
  // const [teamLogo, setTeamLogo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamCreated, setTeamCreated] = useState(false);
  const [allPreferredHostData, setAllPreferredHostData] = useState([]);
  const searchInputRef = useRef(null);
  const [loading , setLoading] = useState(false)
  const [players, setPlayers] = useState([
    { playerNumber: 1, igId: "", ign: "", email: "" },
    { playerNumber: 2, igId: "", ign: "", email: "" },
    { playerNumber: 3, igId: "", ign: "", email: "" },
    { playerNumber: 4, igId: "", ign: "", email: "" },
    { playerNumber: 5, igId: "", ign: "", email: "" },
  ]);
  const [originalPlayers, setOriginalPlayers] = useState([]);
  const [originalTeamName, setOriginalTeamName] = useState("");


  const filteredData = allPreferredHostData.filter((card) =>
    card.preferredName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  const handleInputChangee = (e, playerNumber) => {
    const { name, value } = e.target;
  
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.playerNumber === playerNumber
          ? { ...player, [name]: value }
          : player
      )
    );
  };
  


  // const handleImageUpload = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };

  // const handleLogoChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setTeamLogo(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const submitTeam = ()=> {
  //   console.log(players);
  // }

  const fetchHostRooms = async () => {
    setLoading(true)
    try {
      const res = await getPreferredNameData();
      setAllPreferredHostData(res.data.data);
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(()=> {
    fetchHostRooms();
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

  const hasChanges = () => {
    if (teamName !== originalTeamName) return true;
    
    for (let i = 0; i < players.length; i++) {
      if (
        players[i].ign !== originalPlayers[i]?.ign ||
        players[i].igId !== originalPlayers[i]?.igId ||
        players[i].email !== originalPlayers[i]?.email
      ) {
        return true;
      }
    }
  
    return false;
  };

  const getTeam = async () => {
    setLoading(true)
    try {
      const res = await getUserTeam();
      // console.log(res.data);
      if (res.data.data !== null) {
        setTeamName(res.data.data.teamName);
  
        // Ensure the players array has 5 players, filling missing entries with defaults
        const updatedPlayers = Array.from({ length: 5 }, (_, index) => {
          const player = res.data.data.players[index];
          return {
            playerNumber: index + 1,
            igId: player?.igId || "",
            ign: player?.ign || "",
            email: player?.email || "",
          };
        });

        setOriginalTeamName(res.data.data.teamName);
        setOriginalPlayers(updatedPlayers);
  
        setPlayers(updatedPlayers);
        setTeamCreated(true);
      } else {
        setTeamCreated(false);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
    finally{
      setLoading(false)
    }
  };

  const handleUpdate = async () => {
    console.log(players, teamName);
    try {
      const res = await updateUserTeam(teamName, players);
      toast.success(res.data.message);
      setIsModalOpen(false);
    } catch (error) {
      setIsModalOpen(true);
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=> {
    getTeam();
  }, []);

  const createUserTeam = async (teamName, players) => {
    try {
      const res = await createTeam(teamName, players);
      console.log(res.data);
      setTeamCreated(true);
      setIsModalOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      setIsModalOpen(true);
      toast.error(error.response.data.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserTeam(teamName, players);
  };

  if(loading) return <Loader/>

  return (
    <div className="bg-black text-white flex flex-col items-center p-8">
      <div className="text-center text-4xl font-semibold pt-10 tracking-widest">
        <h1>Arena</h1>
        <span className="block h-1 bg-blue-500 w-16 mx-auto mt-2 rounded"></span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-20 mb-20 px-6">
        <div className="relative mt-20">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search Bar"
            className="w-full p-3 pl-10 pr-20 rounded-xl border border-gray-700 bg-gray-800 text-white focus:outline-none shadow-lg transition-all duration-300"
            style={{ boxShadow: "0 4px 8px rgba(255, 255, 255, 0.1)" }}
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

        <div className="mt-20  flex justify-center md:justify-end w-full">
          {!teamCreated ? (
            <button
              onClick={toggleModal}
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 focus:outline-none transition-colors duration-300 flex items-center">
              <FaPlus className="mr-2" /> Create Team
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 focus:outline-none transition-colors duration-300 flex items-center">
              <Link onClick={toggleModal}>View Team</Link>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4 mb-20">
        {filteredData.map((card) => (
          <div
            key={card._id}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={card.img}
              alt={card.preferredName}
              className="w-full h-40 sm:h-32 md:h-40 object-cover rounded-t-xl"
            />
            <Link to={`/arena/${card._id}`}>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{card.preferredName}</h3>
                <p className="text-sm text-gray-400">Game: {card.game}</p>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none transition-colors duration-300">
                  Details
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/*  */}

      <div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
            onClick={toggleModal}>
            <div
              className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 overflow-hidden"
              onClick={(e) => e.stopPropagation()}>
              {/* Modal content */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Team
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14">
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
                onSubmit={handleSubmit}
                className="p-4 max-h-[70vh] overflow-hidden overflow-y-scroll no-scrollbar">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor={`teamname`}
                      className="block mb-2 text-lg text-center font-medium text-gray-900 dark:text-white">
                      Team Name
                    </label>
                    <input
                      type="text"
                      name={`teamname`}
                      id={`teamname`}
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder={`Team XYZ`}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    {players.map((player) => (
                      <div key={player.playerNumber}>
                        <label
                          htmlFor={`ign`}
                          className="block mb-1 mt-4 text-lg font-medium text-gray-900 dark:text-white">
                          {player.playerNumber === 1 ? (
                            <>
                              {`Player 1 (Leader)`}
                              <LuAsterisk className="text-red-600 inline -mt-4 text-sm" />
                            </>
                          ) : (
                            <>
                              {`Player ${player.playerNumber}`}
                              {player.playerNumber !== 5 && (
                                <LuAsterisk className="text-red-600 inline -mt-4 text-sm" />
                              )}
                            </>
                          )}
                        </label>
                        <div className="flex justify-center items-center gap-2">
                          <input
                            type="text"
                            name={`ign`}
                            id={`ign`}
                            value={player.ign}
                            onChange={(e) =>
                              handleInputChangee(e, player.playerNumber)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder={`IGN`}
                            required={player.playerNumber !== 5 ? true : false}
                          />

                          <input
                            type="number"
                            name={`igId`}
                            id={`igId`}
                            value={player.igId}
                            onChange={(e) =>
                              handleInputChangee(e, player.playerNumber)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder={`ID`}
                            required={player.playerNumber !== 5 ? true : false}
                          />
                          <input
                            type="email"
                            name={`email`}
                            id={`email`}
                            value={player.email}
                            onChange={(e) =>
                              handleInputChangee(e, player.playerNumber)
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder={`Email`}
                            required={player.playerNumber !== 5 ? true : false}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {teamCreated ? (
                  <button
                    type="button"
                    className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                      hasChanges() ? "visible" : "hidden"
                    }`}
                    onClick={handleUpdate}>
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-white inline-flex  items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create Team
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRoom;
