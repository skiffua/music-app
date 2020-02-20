import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './router';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header'

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
