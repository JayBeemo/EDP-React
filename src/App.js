//import logo from './logo.svg';
/* eslint-disabled */ 
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './component/login.js';
import Main from './component/main.js';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/main" element={<Main />}/>
      </Routes>
    </div>

  );
}

export default App;
