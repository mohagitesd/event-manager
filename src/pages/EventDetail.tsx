import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { getEventById, deleteEvent } from "../services/eventService";
import ConfirmModal from "../components/ConfirmModal";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!event) return;

    await deleteEvent(event.id);
    navigate("/events");
  };

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!event) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <p className="text-red-600">
          Événement introuvable ou erreur lors du chargement.
        </p>
      </div>
    );
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
      <button className="btn btn-error mt-6" onClick={() => setShowModal(true)}>
        Supprimer l'événement
      </button>
      <ConfirmModal
        open={showModal}
        title="Supprimer l'événement"
        message="Cette action est irréversible."
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
