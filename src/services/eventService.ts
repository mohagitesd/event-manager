import type { Event } from "../types/Event";
import type { Participant } from "../types/Participant";

// Use a relative path so the Vite dev server can proxy requests to the json-server backend
const API_URL = "/api/events";

export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getEventById = async (id: string): Promise<Event | null> => {
  const res = await fetch(`/api/events/${id}`);

  if (!res.ok) {
    return null;
  }

  return await res.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression");
  }
};

export const addParticipant = async (
  eventId: string,
  participant: Omit<Participant, "id">
): Promise<Event> => {
  const event = await getEventById(eventId);
  if (!event) throw new Error("Événement introuvable");

  const newParticipant = { id: Date.now(), ...participant };
  const updatedParticipants = [...event.participants, newParticipant];

  const res = await fetch(`/api/events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participants: updatedParticipants }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de l'ajout du participant");
  }

  return await res.json();
};

export const deleteParticipant = async (
  eventId: string,
  participantId: number
): Promise<Event> => {
  const event = await getEventById(eventId);
  if (!event) throw new Error("Événement introuvable");

  const updatedParticipants = event.participants.filter(
    (p) => p.id !== participantId
  );

  const res = await fetch(`/api/events/${eventId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ participants: updatedParticipants }),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression du participant");
  }

  return await res.json();
};

export const updateEvent = async (
  id: string,
  data: Partial<Event>
): Promise<Event> => {
  const res = await fetch(`/api/events/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la mise à jour de l'événement");
  }

  return await res.json();
};
