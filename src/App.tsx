import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Features/Auth/Components/LoginPage.tsx';
import UserPage from './Features/UserPage/Components/UserPage.tsx';
import UserProfilePage from './Features/UserPage/Components/UserProfilePage.tsx'
import './App.css';
import MapPage from './Features/UserPage/Components/MapPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/profile" element={<UserPage />}/>
        <Route path="/profile/personal-account" element={<UserProfilePage/>} />
        <Route path="/profile/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
