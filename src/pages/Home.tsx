import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";

export default function Home() {
  const { events } = useEvents();

  const totalEvents = events.length;
  const totalParticipants = events.reduce(
    (sum, e) => sum + e.participants.length,
    0
  );
  const upcomingEvents = events.filter((e) => e.status === "upcoming").length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des événements</h1>

      <div className="stats shadow mb-6">
        <div className="stat">
          <div className="stat-title">Événements</div>
          <div className="stat-value">{totalEvents}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Participants</div>
          <div className="stat-value">{totalParticipants}</div>
        </div>

        <div className="stat">
          <div className="stat-title">À venir</div>
          <div className="stat-value">{upcomingEvents}</div>
        </div>
      </div>

      <Link to="/events" className="btn btn-primary">
        Voir les événements
      </Link>
    </div>
  );
}
