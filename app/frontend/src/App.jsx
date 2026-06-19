import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import CustomCursor from './components/CustomCursor';
import WebGLBackground from './components/WebGLBackground';
import Home from './pages/Home';
import GoalOS from './pages/GoalOS';
import Founder from './pages/Founder';
import Waitlist from './pages/Waitlist';

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <WebGLBackground />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goalos" element={<GoalOS />} />
          <Route path="/about" element={<Founder />} />
          <Route path="/waitlist" element={<Waitlist />} />
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
