import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WipPage from './pages/WipPage';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wip" element={<WipPage />} />
        <Route path="/wip/:slug" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
