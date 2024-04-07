import '@elastic/eui/dist/eui_theme_light.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FriendsEmailsPage from './components/FriendsEmailsPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={ <SignUpPage />}/>
          <Route path='/emails' element={<FriendsEmailsPage />}/>
          <Route  path='/' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
