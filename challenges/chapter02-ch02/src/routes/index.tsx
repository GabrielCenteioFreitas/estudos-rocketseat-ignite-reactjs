import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const OldRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default OldRoutes;
