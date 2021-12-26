import * as React from "react";
import Card from "react-bootstrap/Card";

import { Howl } from 'howler';

import { Analyser, Player, PlayerInstance } from "../playlist/player";
import { useEffect, useState } from "react";
import { eventBus } from "../../event-bus/event-bus";

const Equalizer = (): any => {
    let sound: Howl | null = null;
    const [dataArray, setData] = useState(new Uint8Array());

    useEffect(() => {
        eventBus.on("onPlaySong", () => {
            sound = Player.getInstance();

            if (sound) {
                sound.on('play', () => {
                    Analyser.createAnalyser(sound);
                    setInterval(() => {
                        setData(Uint8Array.from(Analyser.getFrequency())) ;
                    }, 1000)
                });
            }
        });


        return () => {
        eventBus.remove("onPlaySong");
        }
    }, []);

     return (
         <Card
             className="audio-player p-0 flex-grow-1"
         >
             <Card.Body
                 className="flex-grow-1 p-2"
             >
                 <div className="">
                     Equalizer { dataArray }
                 </div>
             </Card.Body>
         </Card>
        );
};

export default Equalizer
