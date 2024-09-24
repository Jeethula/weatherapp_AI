import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Weather from './components/Weather';
import Dashboard from '../src/components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/" element={<Weather />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
};

export default App;