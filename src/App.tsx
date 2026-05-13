import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Biography from './pages/Biography';
import Gallery from './pages/Gallery';
import Tributes from './pages/Tributes';
import LeaveTribute from './pages/LeaveTribute';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative bg-brand-canvas text-brand-body selection:bg-brand-ink selection:text-white pb-0 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/biography" element={<Biography />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/tributes" element={<Tributes />} />
            <Route path="/leave-tribute" element={<LeaveTribute />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
