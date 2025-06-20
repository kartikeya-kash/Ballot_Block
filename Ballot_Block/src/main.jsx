import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './landing.jsx';
import Login from './Login.jsx';
import './index.css';
import AddCandidates from './AddCandidates.jsx'; 
import { useNavigate } from 'react-router-dom';
import VotePage from './VotePage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import RegisterFace from './RegisterFace.jsx';
import ShowChain from './ShowChain';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-candidates" element={<AddCandidates />} />
        
        <Route
          path="/vote"
          element={
            <ProtectedRoute>
              <VotePage />
            </ProtectedRoute>
          }
        />

        <Route path="/register-face" element={<RegisterFace />} />
          <Route path="/chain" element={<ShowChain />} /> 

          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);