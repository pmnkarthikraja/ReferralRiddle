import '@elastic/eui/dist/eui_theme_light.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import FriendsEmailsPage from './pages/FriendsEmailsPage';
import HomePage from './pages/HomePage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { EuiProvider } from '@elastic/eui';
import React from 'react';

const queryClient = new QueryClient()
function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <EuiProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/emails' element={<FriendsEmailsPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </EuiProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
