# Event Manager — Guide d'installation et d'utilisation ✅

Un petit projet React + TypeScript (Vite) qui utilise `json-server` comme backend de développement pour gérer des événements et leurs participants.

---

## ⚙️ Prérequis

- Node.js (>= 18 recommandé)
- npm ou yarn (le projet utilise npm dans les exemples)

---

## 📥 Installation

1. Cloner le dépôt et se placer dans le dossier :

```bash
git clone <repo-url>
cd event-manager
```

2. Installer les dépendances :

```bash
npm install
```

---

## ▶️ Lancer le projet en développement

Le frontend (Vite) et le faux backend (`json-server`) sont lancés séparément :

- Démarrer le backend JSON (port 3001) :

```bash
npm run json-server
```

- Démarrer le serveur de dev Vite :

```bash
npm run dev
```

- Ouvrir l'app : http://localhost:5173 (ou l'URL fournie par Vite)

> Le serveur Vite proxy les requêtes vers `/api` vers `http://localhost:3001` (config dans `vite.config.ts`).

---

## 📦 Scripts utiles (dans `package.json`)

- `npm run dev` — démarre Vite (dev)
- `npm run json-server` — démarre `json-server --watch db.json --port 3001`
- `npm run build` — build de production
- `npm run preview` — preview du build produit
- `npm run lint` — lancer ESLint

---

## 🔌 API & conventions

- Base API pour le frontend : `/api/events` (proxy vers `http://localhost:3001/events`)
- Endpoints principaux (gérés par `json-server`) :
  - `GET /events` — lister
  - `GET /events/:id` — récupérer un événement
  - `POST /events` — créer
  - `PATCH /events/:id` — mise à jour (utilisé pour modifier l'événement et pour ajouter/supprimer des participants)
  - `DELETE /events/:id` — supprimer

---

## 🧭 Fonctionnalités importantes

- Création d'événements : UI `GET /events/create` (formulaire)
- Détails d'un événement : `GET /events/:id` — possibilité d'ajouter/supprimer des participants et de modifier les champs via le bouton **Modifier**
- Les statuts internes sont `"upcoming" | "ongoing" | "finished"`; ils sont affichés en français via `src/utils/status.ts` (`À venir`, `En cours`, `Terminés`).

---

## 📝 Types (TypeScript)

- `Event.id` est un **string** (correspond aux ids générés dans `db.json`)
- `Participant.id` est un **number**

---
