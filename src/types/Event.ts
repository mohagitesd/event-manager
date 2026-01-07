import { Participant } from "./Participant";

export type EventStatus = "upcoming" | "ongoing" | "finished";

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  status: EventStatus;
  participants: Participant[];
}
