import { useLocation } from "react-router-dom";

const ViewTeam = () => {
  const location = useLocation();
  const teamData = location.state?.teamData;

  if (!teamData) {
    return <div>No team data available.</div>;
  }

  return (
    <div className="team-details">
      <h2 className="text-xl font-bold mb-4">Team Name: {teamData.teamName}</h2>
      <ul>
        {teamData.players.map((player, index) => (
          <li key={index} className="mb-2">
            <strong>Player {player.playerNumber}</strong>: {player.ign}, {player.igId}, {player.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTeam