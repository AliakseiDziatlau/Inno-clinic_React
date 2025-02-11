import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Features/Auth/Components/LoginPage.tsx';
import UserPage from './Features/UserPage/Components/UserPage.tsx';
import UserProfilePage from './Features/UserPage/Components/UserProfilePage.tsx'
import './App.css';
import MapPage from './Features/UserPage/Components/MapPage.tsx';
import ReceptionistPage from './Features/ReceptionistPage/Components/ReceptionistPage.tsx';
import config from './Configurations/Config.ts';
import DoctorInfoPage from './Features/ReceptionistPage/Components/DoctorInfoPage.tsx';
import OfficeInfoPage from './Features/ReceptionistPage/Components/OfficeInfoPage.tsx';
import PatientInfoPage from './Features/ReceptionistPage/Components/PatientInfoPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={config.LoginPageUrl} element={<LoginPage />}/>
        <Route path={config.PatientPageUrl} element={<UserPage />}/>
        <Route path={config.PatientPageProfileUrl} element={<UserProfilePage/>} />
        <Route path={config.PatientPageMapUrl} element={<MapPage />} />
        <Route path={config.ReceptionistPageUrl} element={<ReceptionistPage />}/>
        <Route path={config.ReceptionistPageChangeDoctorUrl} element={<DoctorInfoPage/>}/>
        <Route path={config.ReceptionistPageChangeOfficeUrl} element={<OfficeInfoPage/>}/>
        <Route path={config.ReceptionistPageChangePatientUrl} element={<PatientInfoPage/>}/>
      </Routes >
    </Router>
  );
};

export default App;
