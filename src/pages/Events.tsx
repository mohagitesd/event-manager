import { useState } from "react";
import { useEvents } from "../context/EventContext";
import EventCard from "../components/EventCard";
import type { EventStatus } from "../types/Event";
import { Link } from "react-router-dom";

export default function Events() {
  const { events, loading } = useEvents();

  // État du filtre par statut
  const [statusFilter, setStatusFilter] = useState<EventStatus | "">("");

  // État de la recherche par nom
  const [search, setSearch] = useState("");

  // Liste filtrée (statut + recherche)
  const filteredEvents = events.filter((event) => {
    const matchStatus = statusFilter === "" || event.status === statusFilter;

    const matchSearch = event.name.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  // Loader pendant le fetch
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/events/create" className="btn btn-primary mb-4">
        Créer un événement
      </Link>
      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as EventStatus)}
        >
          <option value="">Tous les statuts</option>
          <option value="upcoming">À venir</option>
          <option value="ongoing">En cours</option>
          <option value="finished">Terminés</option>
        </select>

        <input
          type="text"
          placeholder="Rechercher un événement"
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Aucun résultat */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500">Aucun événement trouvé</p>
      )}

      {/* Liste des événements */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
