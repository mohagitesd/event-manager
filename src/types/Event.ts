import type { Participant } from "./Participant";

export type EventStatus = "upcoming" | "ongoing" | "finished";

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  status: EventStatus;
  participants: Participant[];
}
