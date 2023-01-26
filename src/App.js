//import logo from './logo.svg';
/* eslint-disabled */ 
import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './component/login.js';
import Main from './component/main.js';
import PointReview from './component/pointReview';
import Home from './component/home'
import History from './component/history'

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/main" element={<Main />}/>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/pointreview" element={<PointReview />}/>
        <Route exact path="/history" element={<History />}/>
      </Routes>
    </div>
  );
}
export default App;
