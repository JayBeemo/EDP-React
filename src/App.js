//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './component/login.js';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/login" element={<Login />}/>
      </Routes>
    </div>

  );
}

export default App;
