import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import AdminPage from './components/AdminPage/AdminPage';
import UserPage from './components/User/UserPage';
import AdminLogin from './components/AdminLogin/AdminLogin';
import CampusTrail from './components/trail/trail'; // Import the trail component

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/trail" element={<CampusTrail />} /> {/* Add this route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;