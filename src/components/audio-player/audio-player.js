import React, { useEffect, useRef, useState } from "react";
import { Howl, Howler } from 'howler';

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AudioPlayer = () => {

     return (
         <Card style={{ width: '18rem' }}>
             <Card.Body>
                 <div className="title">
                     <div className="track"></div>
                     <div className="timer"></div>
                     <div className="duration"></div>
                 </div>
                 <div className="controls-outer">
                     <div className="controls-inner">
                         <div className="controls-btn play-btn"></div>
                         <div className="controls-btn pause-btn"></div>
                         <div className="controls-btn prev-btn"></div>
                         <div className="controls-btn next-btn"></div>
                     </div>
                     <div className="volume-btn"></div>
                 </div>
             </Card.Body>
         </Card>
        );
};

export default AudioPlayer
