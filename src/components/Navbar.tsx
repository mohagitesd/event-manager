import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Event Manager
        </Link>
      </div>
      <div className="flex gap-2">
        <Link to="/events" className="btn btn-ghost">
          Events
        </Link>
        <Link to="/stats" className="btn btn-ghost">
          Stats
        </Link>
      </div>
    </div>
  );
}
