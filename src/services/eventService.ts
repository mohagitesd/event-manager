import type { Event } from "../types/Event";

// Use a relative path so the Vite dev server can proxy requests to the json-server backend
const API_URL = "/events";

export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getEventById = async (id: number): Promise<Event> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};
