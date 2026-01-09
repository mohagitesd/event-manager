import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Event, EventStatus } from "../types/Event";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Event, "id" | "participants">>({
    name: "",
    date: "",
    location: "",
    description: "",
    status: "upcoming" as EventStatus,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        participants: [],
      }),
    });

    navigate("/events");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer un événement</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Nom"
          className="input input-bordered w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="date"
          type="date"
          className="input input-bordered w-full"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          type="text"
          placeholder="Lieu"
          className="input input-bordered w-full"
          value={form.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={form.description}
          onChange={handleChange}
        />

        <select
          name="status"
          className="select select-bordered w-full"
          value={form.status}
          onChange={handleChange}
        >
          <option value="upcoming">À venir</option>
          <option value="ongoing">En cours</option>
          <option value="finished">Terminé</option>
        </select>

        <button className="btn btn-primary w-full">Créer</button>
      </form>
    </div>
  );
}
