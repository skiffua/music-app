import React from "react";
import Card from "react-bootstrap/Card";
import './playlist.scss';

const Playlist = () => {

     return (
         <Card
             className="audio-player p-0 flex-grow-1"
             style={{ width: '18rem' }}
         >
             <Card.Body
                 className="flex-grow-1 p-2"
             >
                 <div className="title d-flex justify-content-between p-1 pr-4 pl-4">
                     <div className="track">Track</div>
                     <div className="timer">Time</div>
                     <div className="duration">Duration</div>
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

export default Playlist
