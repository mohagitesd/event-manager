import type { EventStatus } from "../types/Event";

export const STATUS_LABELS: Record<EventStatus, string> = {
  upcoming: "À venir",
  ongoing: "En cours",
  finished: "Terminés",
};

export const statusLabel = (status: EventStatus) => STATUS_LABELS[status];
