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
    // 웹사이트 라우팅
    // 로그인 페이지 : login.js
    // 기본 페이지 : main.js 내 home.js 컴포넌트
    <div>
        <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/main" element={<Main />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/pointreview" element={<PointReview />}/>
            <Route path="/history" element={<History />}/>
          </Routes>
    </div>
  );
}
export default App;
