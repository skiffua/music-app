import React, {useEffect, useState} from "react";

import mainBackGroundWebp1440 from '../assets/images/background-music-1440.webp';
import mainBackGroundWebp700 from '../assets/images/background-music-1440.webp';
import mainBackGroundWebp200 from '../assets/images/background-music-1440.webp';
import mainBackGround1440 from '../assets/images/background-music-1440.png';
import mainBackGround700 from '../assets/images/background-music-1440.png';
import mainBackGround200 from '../assets/images/background-music-1440.png';

import smokeGroundWebp1440 from '../assets/images/smoke-1440.webp';
import smokeBackGround1440 from '../assets/images/smoke-1440.png';

import smokeGroundWebp144070 from '../assets/images/smoke-1440-70.webp';
import smokeBackGround144070 from '../assets/images/smoke-1440-70.png';


import titleWebpImg from '../assets/images/title.png';
import titlePngImg from '../assets/images/title.webp';

import './home.scss';

const Home = () => {

    return (
        <div className="homepage flex-grow-1 position-relative">
                <div className="homepage-title position-absolute">
                    <picture>
                        <source srcSet={`${titleWebpImg}`}
                                type="image/webp" />
                        <img className="homepage-title-img"
                             alt="music background cover" src={titlePngImg}
                             srcSet={`${titlePngImg}`}/>

                    </picture>
                </div>
                <div className="homepage-background position-absolute">
                    <picture>
                        <source srcSet={`${mainBackGroundWebp1440} 1440w, ${mainBackGroundWebp700} 700w" sizes="700vw", ${mainBackGroundWebp200} 700w" sizes="200vw"`}
                                type="image/webp" />
                        <img className="homepage-background-img position-absolute"
                             alt="music background cover" src={mainBackGround1440}
                             srcSet={`${mainBackGround1440} 1440w, ${mainBackGround700} 700w" sizes="700vw", ${mainBackGround200} 700w" sizes="200vw"`}
                             sizes="100vw"/>

                    </picture>
                </div>
                <div className="homepage-background homepage-smoke position-absolute">
                    <picture>
                        <source srcSet={`${smokeGroundWebp1440} 1440w`}
                                type="image/webp" />
                        <img className="homepage-background-img homepage-img-smoke position-absolute"
                             alt="music background smoke" src={smokeBackGround1440}
                             srcSet={`${smokeBackGround1440} 1440w`}
                             sizes="100vw"/>

                    </picture>
                </div>
                <div className="homepage-background homepage-smoke homepage-smoke-lighten position-absolute">
                    <picture>
                        <source srcSet={`${smokeGroundWebp144070} 1440w`}
                                type="image/webp" />
                        <img className="homepage-background-img homepage-img-smoke homepage-img-lighten position-absolute"
                             alt="music background smoke" src={smokeBackGround144070}
                             srcSet={`${smokeBackGround144070} 1440w`}
                             sizes="100vw"/>

                    </picture>
                </div>
            </div>
    )
};

export default Home
