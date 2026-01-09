import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Stats from "./pages/Stats";
import { EventProvider } from "./context/EventContext";
import Navbar from "./components/Navbar";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/events/create" element={<CreateEvent />} />
        </Routes>
      </EventProvider>
    </BrowserRouter>
  );
}

export default App;
