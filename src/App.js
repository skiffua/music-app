import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './router';

import Header from './components/header';
import { CurrentUserProvider } from './context/currentUser';

import './styles/index.scss';

function App() {
  return (
      <CurrentUserProvider>
        <BrowserRouter>
            <Header/>
            <Routes />
        </BrowserRouter>
      </CurrentUserProvider>
  );
}

export default App;
