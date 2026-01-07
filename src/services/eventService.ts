import { Event } from "../types/event";

const API_URL = "http://localhost:3001/events";

export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getEventById = async (id: number): Promise<Event> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};
