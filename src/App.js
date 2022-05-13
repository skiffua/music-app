import React, {useEffect, useState} from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './router';

import Header from './components/header';
import { CurrentUserProvider } from './context/currentUser';

import './styles/index.scss';
import pumpingWebpImg from "./assets/images/pumping.png";
import pumpingPngImg from "./assets/images/title.webp";

function App() {
    const [isAllDataLoaded, setAllDataLoaded] = useState(false);

    useEffect(() => {
        window.addEventListener("load", function(event) {
            setAllDataLoaded(true);
        });
    }, []);

    if (!isAllDataLoaded) { return (
      <CurrentUserProvider>
        <BrowserRouter>
            <Header/>
            <Routes />
        </BrowserRouter>
      </CurrentUserProvider>
  )} else {
        return (<div className="main-homepage">
            <picture>
                <source srcSet={`${pumpingWebpImg}`}
                        type="image/webp" />
                <img className="pumping"
                     alt="pumping" src={pumpingWebpImg}
                     srcSet={`${pumpingWebpImg}`}/>

            </picture>
        </div>)
    }
}

export default App;
