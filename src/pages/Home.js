import React from "react";

import mainBackGroundWebp1440 from '../assets/images/background-music-1440.webp';
import mainBackGroundWebp700 from '../assets/images/background-music-1440.webp';
import mainBackGroundWebp200 from '../assets/images/background-music-1440.webp';
import mainBackGround1440 from '../assets/images/background-music-1440.png';
import mainBackGround700 from '../assets/images/background-music-1440.png';
import mainBackGround200 from '../assets/images/background-music-1440.png';

import './home.scss';

const Home = () => {
    return (
        <div className="homepage">
            <div className="homepage-background">
                <picture className="homepage-background">
                    <source srcSet={`${mainBackGroundWebp1440} 1440w, ${mainBackGroundWebp700} 700w" sizes="700vw", ${mainBackGroundWebp200} 700w" sizes="200vw"`}
                            type="image/webp" />
                    <img className="homepage-background-img"
                         alt="music background cover" src={mainBackGround1440}
                         srcSet={`${mainBackGround1440} 1440w, ${mainBackGround700} 700w" sizes="700vw", ${mainBackGround200} 700w" sizes="200vw"`}
                         sizes="100vw"/>

                </picture>
            </div>
        </div>
    )
};

export default Home
