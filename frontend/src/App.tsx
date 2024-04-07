import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import _ from 'lodash';
import MyApp from './components/Home';
import LoginPage from './components/Login';
import SignUpPage from './components/SignUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import FriendsEmails from './components/FriendsEmails';
import '@elastic/eui/dist/eui_theme_light.css';


function App() {
  const [signUpPage, setSignUpPage] = useState<Boolean>(false)

  const onSignUpPage = (isTrue: boolean) => {
    setSignUpPage(isTrue)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={ <SignUpPage />}/>
          <Route path='/emails' element={<FriendsEmails />}/>
          <Route  path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
