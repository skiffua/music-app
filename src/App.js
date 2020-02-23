import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
