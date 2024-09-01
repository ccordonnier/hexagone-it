// src/router.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Streamer from './pages/Streamer';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streamer/:login" element={<Streamer />} />
        {/* <Route path="/game/:id" element={<GameDetail />} />
        <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </Router>
  );
};

export default AppRouter;