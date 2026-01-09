import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useEvents } from "../context/EventContext";

export default function Stats() {
  const { events, loading } = useEvents();

  const totalEvents = events.length;
  const totalParticipants = events.reduce(
    (s, e) => s + e.participants.length,
    0
  );
  const avgParticipants = totalEvents
    ? (totalParticipants / totalEvents).toFixed(1)
    : "0";

  const eventsByStatus = useMemo(() => {
    return events.reduce(
      (acc, e) => {
        acc[e.status] = (acc[e.status] || 0) + 1;
        return acc;
      },
      { upcoming: 0, ongoing: 0, finished: 0 } as Record<string, number>
    );
  }, [events]);

  const participantsByLocation = useMemo(() => {
    const map = new Map<string, number>();
    events.forEach((e) => {
      const prev = map.get(e.location) || 0;
      map.set(e.location, prev + e.participants.length);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [events]);

  const topEventsByParticipants = useMemo(() => {
    return [...events]
      .sort((a, b) => b.participants.length - a.participants.length)
      .slice(0, 5);
  }, [events]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Événements</div>
            <div className="stat-value">{totalEvents}</div>
            <div className="stat-desc">Total d'événements</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Participants</div>
            <div className="stat-value">{totalParticipants}</div>
            <div className="stat-desc">Total de participants</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Moyenne</div>
            <div className="stat-value">{avgParticipants}</div>
            <div className="stat-desc">Participants / événement (moyenne)</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="shadow p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Répartition par statut</h2>
          <div className="flex gap-4">
            <div className="badge badge-outline">
              À venir: {eventsByStatus.upcoming}
            </div>
            <div className="badge badge-outline">
              En cours: {eventsByStatus.ongoing}
            </div>
            <div className="badge badge-outline">
              Terminés: {eventsByStatus.finished}
            </div>
          </div>
        </section>

        <section className="shadow p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">
            Top événements (par participants)
          </h2>
          {topEventsByParticipants.length === 0 ? (
            <p className="text-gray-500">Aucun événement</p>
          ) : (
            <ul className="space-y-2">
              {topEventsByParticipants.map((e) => (
                <li key={e.id} className="flex justify-between items-center">
                  <Link to={`/events/${e.id}`} className="link">
                    {e.name}
                  </Link>
                  <span className="text-sm text-gray-600">
                    {e.participants.length} participants
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="shadow p-4 rounded-md md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Participants par lieu</h2>
          {participantsByLocation.length === 0 ? (
            <p className="text-gray-500">Aucun lieu</p>
          ) : (
            <div className="grid gap-2 md:grid-cols-2">
              {participantsByLocation.map(([loc, count]) => (
                <div
                  key={loc}
                  className="p-2 border rounded-md flex justify-between"
                >
                  <span>{loc}</span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
