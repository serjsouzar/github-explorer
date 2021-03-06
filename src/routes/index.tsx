import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/dashboard';
import Repository from '../pages/Repository/repository';


const AppRoutes: React.FC = () => (
    <Routes>
      <Route path="/" element={<Dashboard />} />;
      <Route path="/repository" element={<Repository />} />;
    </Routes>
);
export default AppRoutes;
