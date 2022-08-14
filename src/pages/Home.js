import React, {useEffect, useRef, useState} from "react";
import gsap from 'gsap';

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
import {OPACITY_CHANGE, SMOKE_EFFECT, TEXT_JUMPING} from "../constants/animations";

const Home = () => {
    const smokeRef = useRef(null);
    const subTitleRef = useRef(null);

    useEffect(() => {
        var pageTimeline = document.timeline;
        var thisMoment = pageTimeline.currentTime;
        console.log('thisMoment', thisMoment);

        if (subTitleRef) {
            const firts = subTitleRef.current.innerText[0];
            // subTitleRef.current.animate(
            //     TEXT_JUMPING,
            //     {
            //         duration: 5000,
            //         iterations: Infinity,
            //     }
            // )
            console.log(subTitleRef);

            gsap.from(subTitleRef.current.children, { duration: 4, opacity: 0, stagger: 2 });
        }
    }, [subTitleRef]);

    useEffect(() => {
        if (smokeRef) {
            smokeRef.current.animate(
                SMOKE_EFFECT,
                {
                    duration: 40000,
                    iterations: 1,
                }
            )
        }
    }, [smokeRef]);

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
                    <div className="homepage-sub-title"
                         ref={subTitleRef}
                    >
                        {/*<span className="homepage-sub-title-letter">Т</span>*/}
                        {/*<span className="homepage-sub-title-letter">Е</span>*/}
                        {/*<span className="homepage-sub-title-letter">Р</span>*/}
                        {/*<span className="homepage-sub-title-letter">И</span>*/}
                        {/*<span className="homepage-sub-title-letter">Т</span>*/}
                        {/*<span className="homepage-sub-title-letter">О</span>*/}
                        {/*<span className="homepage-sub-title-letter">Р</span>*/}
                        {/*<span className="homepage-sub-title-letter">І</span>*/}
                        {/*<span className="homepage-sub-title-letter">Я</span>*/}
                        <span>ТЕРИТОРІЯ</span>
                        <p>
                            <span>УКРАЇНСЬКОЇ МУЗИКИ</span>
                        </p>
                        {/*<p>*/}
                        {/*    <span>ТЕРИТОРІЯ <br/> УКРАЇНСЬКОЇ МУЗИКИ</span>*/}
                        {/*</p>*/}
                    </div>
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
                        <img ref={smokeRef}
                            className="homepage-background-img homepage-img-smoke position-absolute"
                             alt="music background smoke" src={smokeBackGround1440}
                             srcSet={`${smokeBackGround1440} 1440w`}
                             sizes="100vw"/>

                    </picture>
                </div>
                {/*<div className="homepage-background homepage-smoke homepage-smoke-lighten position-absolute">*/}
                {/*    <picture>*/}
                {/*        <source srcSet={`${smokeGroundWebp144070} 1440w`}*/}
                {/*                type="image/webp" />*/}
                {/*        <img className="homepage-background-img homepage-img-smoke homepage-img-lighten position-absolute"*/}
                {/*             alt="music background smoke" src={smokeBackGround144070}*/}
                {/*             srcSet={`${smokeBackGround144070} 1440w`}*/}
                {/*             sizes="100vw"/>*/}

                {/*    </picture>*/}
                {/*</div>*/}
            </div>
    )
};

export default Home
