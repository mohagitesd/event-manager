import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import { EventProvider } from "./context/EventContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <EventProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </EventProvider>
    </BrowserRouter>
  );
}

export default App;
