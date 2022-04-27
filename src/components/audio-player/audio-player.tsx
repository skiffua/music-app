import * as React from "react";
import Card from "react-bootstrap/Card";
import './audio-player.scss';

import { Player } from "../playlist/player";
import {useEffect} from "react";

const AudioPlayer = (): any => {

    // useEffect()

     return (
         <Card
             className="controls p-0 flex-grow-1 border-0"
         >
             <Card.Body
                 className="flex-grow-1 p-0"
             >
                 <div className="controls-text controls-text-title d-flex justify-content-between p-1">
                     <div className="controls-text controls-text-track">Track</div>
                     <div className="controls-text controls-text-timer">Time</div>
                     <div className="controls-text controls-text-duration">Duration</div>
                 </div>
                 <div className="controls-outer">
                     <div className="controls-inner d-flex justify-content-around">
                         <div className="controls-btn prev-btn"/>
                         <div className="controls-btn pause-btn"/>
                         <div className="controls-btn play-btn is-checked"/>
                         <div className="controls-btn stop-btn"/>
                         <div className="controls-btn next-btn"/>
                     </div>
                     <div className="controls-btn loading-btn"/>
                     <div className="volume-btn"></div>
                 </div>
             </Card.Body>
         </Card>
        );
};

export default AudioPlayer
