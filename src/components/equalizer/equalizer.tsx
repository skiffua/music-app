import * as React from "react";
import canvasSketch from 'canvas-sketch';

import { Howl } from 'howler';

import { Analyser, Player, PlayerInstance } from "../playlist/player";
import { useEffect, useRef, useState } from "react";
import { eventBus } from "../../event-bus/event-bus";
import {RefObject} from "react";
import { Card } from "react-bootstrap";
import './equlizer.scss';
import { RectangleEqualizer } from "./helper";

const Equalizer = (): any => {
    let sound: Howl | null = null;
    const [dataArray, setData] = useState(new Uint8Array(128));
    const [context, setContext] = useState(null);
    const [RectEq, setRectEq] = useState(null);
    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
        fillStyle: 'orange',
    };

    const canvas = useRef(null);

    useEffect(() => {
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetHeight;

        if (context) { setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height)); }
    }, [context]);

    useEffect(() => {
        if (!context) { return; }

        window.requestAnimationFrame(() => RectEq.rectangles(canvas.current.offsetWidth, canvas.current.offsetHeight, dataArray));
    }, [dataArray]);

    useEffect(() => {
        setContext(canvas.current.getContext('2d'));

        eventBus.on("onPlaySong", () => {
            sound = Player.getInstance();
            let intervalId;

            if (sound) {
                sound.on('play', () => {
                    Analyser.createAnalyser(sound);
                    // setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height));

                    intervalId = setInterval(() => {
                        setData(arr => Uint8Array.from(Analyser.getFrequency())) ;
                    }, 50)
                });

                sound.on('pause', () => {
                    clearInterval(intervalId);
                });

                sound.on('stop', () => {
                    clearInterval(intervalId);
                });
            }
        });

        return () => {
        eventBus.remove("onPlaySong");
        }
    }, []);

     return (
         <Card
             className="audio-player p-0"
         >
             <Card.Body
                 className="p-2"
             >
                 <canvas ref={canvas} className="canvas"/>
             </Card.Body>
         </Card>
        );
};

export default Equalizer
