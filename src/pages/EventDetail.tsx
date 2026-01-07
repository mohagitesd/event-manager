import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { getEventById } from "../services/eventService";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getEventById(Number(id)).then((data) => {
        setEvent(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!event) {
    return <p>Événement introuvable</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{event.name}</h1>
      <p>{event.description}</p>

      <h2 className="mt-6 font-semibold">Participants</h2>
      <ul className="list-disc ml-6">
        {event.participants.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
