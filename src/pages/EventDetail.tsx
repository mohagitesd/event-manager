import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Event } from "../types/Event";
import {
  getEventById,
  deleteEvent,
  addParticipant,
  deleteParticipant,
  updateEvent,
} from "../services/eventService";
import ConfirmModal from "../components/ConfirmModal";
import { STATUS_LABELS } from "../utils/status";
import { useEvents } from "../context/EventContext";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [participantLoading, setParticipantLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    status: "upcoming" as Event["status"],
  });
  const navigate = useNavigate();
  const { updateEventLocal, removeEventLocal } = useEvents();

  const handleDelete = async () => {
    if (!event) return;

    await deleteEvent(event.id);
    removeEventLocal(event.id);
    navigate("/events");
  };

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !participantName.trim()) return;

    setParticipantLoading(true);
    try {
      const updatedEvent = await addParticipant(event.id, {
        name: participantName.trim(),
        email: participantEmail.trim(),
      });
      setEvent(updatedEvent);
      setParticipantName("");
      setParticipantEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setParticipantLoading(false);
    }
  };

  const handleDeleteParticipant = async (participantId: number) => {
    if (!event) return;

    setParticipantLoading(true);
    try {
      const updatedEvent = await deleteParticipant(event.id, participantId);
      setEvent(updatedEvent);
    } catch (err) {
      console.error(err);
    } finally {
      setParticipantLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (!event) return;
    setEditForm({
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      status: event.status,
    });
    setEditMode((v) => !v);
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    try {
      const updatedEvent = await updateEvent(event.id, editForm);
      setEvent(updatedEvent);
      updateEventLocal(updatedEvent);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
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
      <div className="flex items-center justify-between mb-4">
        {!editMode ? (
          <>
            <h1 className="text-2xl font-bold">
              {event.name}{" "}
              <span className="ml-2 badge badge-outline">
                {STATUS_LABELS[event.status]}
              </span>
            </h1>
            <button className="btn btn-outline" onClick={handleEditToggle}>
              Modifier
            </button>
          </>
        ) : (
          <form onSubmit={handleEditSubmit} className="w-full space-y-4">
            <div className="flex gap-2">
              <input
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="input input-bordered flex-1"
                required
              />
              <input
                name="date"
                type="date"
                value={editForm.date}
                onChange={handleEditChange}
                className="input input-bordered w-48"
                required
              />
            </div>

            <input
              name="location"
              value={editForm.location}
              onChange={handleEditChange}
              className="input input-bordered w-full"
              required
            />

            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              className="textarea textarea-bordered w-full"
            />

            <select
              name="status"
              value={editForm.status}
              onChange={handleEditChange}
              className="select select-bordered w-full"
            >
              <option value="upcoming">À venir</option>
              <option value="ongoing">En cours</option>
              <option value="finished">Terminé</option>
            </select>

            <div className="flex gap-2">
              <button className="btn btn-primary">Enregistrer</button>
              <button
                type="button"
                className="btn"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>

      {!editMode && <p>{event.description}</p>}

      <h2 className="mt-6 font-semibold">Participants</h2>

      <form onSubmit={handleAddParticipant} className="flex gap-2 mt-4">
        <input
          name="name"
          placeholder="Nom"
          className="input input-bordered flex-1"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          required
        />
        <input
          name="email"
          placeholder="Email"
          className="input input-bordered w-48"
          value={participantEmail}
          onChange={(e) => setParticipantEmail(e.target.value)}
        />
        <button className="btn btn-primary" disabled={participantLoading}>
          {participantLoading ? "..." : "Ajouter"}
        </button>
      </form>

      <ul className="list-disc ml-6 mt-4">
        {event.participants.map((p) => (
          <li key={p.id} className="flex items-center justify-between">
            <div>
              <span className="font-medium">{p.name}</span>
              {p.email && (
                <span className="text-sm text-gray-500"> ({p.email})</span>
              )}
            </div>
            <button
              className="btn btn-sm btn-error"
              onClick={() => handleDeleteParticipant(p.id)}
              disabled={participantLoading}
            >
              Supprimer
            </button>
          </li>
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
