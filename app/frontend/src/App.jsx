import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import WebGLBackground from './components/WebGLBackground';
import Home from './pages/Home';
import GoalOS from './pages/GoalOS';
import Founder from './pages/Founder';
import Waitlist from './pages/Waitlist';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <CustomCursor />
        <WebGLBackground />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/goalos" element={<GoalOS />} />
            <Route path="/about" element={<Founder />} />
            <Route path="/waitlist" element={<Waitlist />} />
            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </div>
    </HelmetProvider>
  );
}

export default App;

