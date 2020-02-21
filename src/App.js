import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './router';

import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style/index.scss';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes />
        </BrowserRouter>
    </div>
  );
}

export default App;
