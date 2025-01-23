import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Features/Auth/Components/LoginPage.tsx';
import UserPage from './Features/UserPage/Components/UserPage.tsx'
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/profile" element={<UserPage />}/>
      </Routes>
    </Router>
    // <div className="App">
    //     <LoginPage />
    // </div>
  );
};

export default App;
