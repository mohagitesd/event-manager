import type { Event } from "../types/Event";
import { Link } from "react-router-dom";
import { STATUS_LABELS } from "../utils/status";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{event.name}</h2>
          <span className="badge badge-outline">
            {STATUS_LABELS[event.status]}
          </span>
        </div>

        <p>Date : {event.date}</p>
        <p>Lieu : {event.location}</p>
        <p>Participants : {event.participants.length}</p>

        <div className="card-actions justify-end">
          <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
            Voir
          </Link>
        </div>
      </div>
    </div>
  );
}
