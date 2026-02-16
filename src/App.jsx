import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About'; // Reuse component as page or wrap if needed
import Objectives from './components/Objectives';
import Activities from './components/Activities';
import Coordinators from './pages/Coordinators';
import Faculty from './pages/Faculty';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import './App.css';

import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[var(--color-dark-bg)] text-white font-sans selection:bg-cyan-500 selection:text-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="pt-28"><About /></div>} />
            <Route path="/objectives" element={<div className="pt-28"><Objectives /></div>} />
            <Route path="/activities" element={<div className="pt-28"><Activities /></div>} />
            <Route path="/coordinators" element={<div className="pt-28"><Coordinators /></div>} />
            <Route path="/faculty" element={<div className="pt-28"><Faculty /></div>} />
            <Route path="/projects" element={<div className="pt-28"><Projects /></div>} />
            <Route path="/gallery" element={<div className="pt-28"><Gallery /></div>} />
            <Route path="/contact" element={<div className="pt-28"><Contact /></div>} />

            {/* Admin Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
