import { createContext, useContext, useEffect, useState } from "react";
import type { Event } from "../types/Event";
import { getEvents } from "../services/eventService";

interface EventContextType {
  events: Event[];
  loading: boolean;
  addEventLocal: (event: Event) => void;
  updateEventLocal: (event: Event) => void;
  removeEventLocal: (id: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const addEventLocal = (event: Event) => setEvents((prev) => [...prev, event]);
  const updateEventLocal = (updatedEvent: Event) =>
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  const removeEventLocal = (id: string) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        addEventLocal,
        updateEventLocal,
        removeEventLocal,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within EventProvider");
  }
  return context;
};
