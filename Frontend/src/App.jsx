import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import OrderPage from './pages/OrderPage';
import AdminPage from './pages/AdminPage';
import SuccessPage from './pages/SuccessPage';
import FailurePage from './pages/FailurePage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/failed" element={<FailurePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
