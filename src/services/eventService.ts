import type { Event } from "../types/Event";

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
