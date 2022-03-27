import * as React from "react";
import { Howl } from 'howler';
import { connect, useSelector } from 'react-redux';

import { Analyser, Player } from "../playlist/player";
import { useEffect, useRef, useState } from "react";
import { eventBus } from "../../event-bus/event-bus";
import { Card } from "react-bootstrap";
import './equlizer.scss';
import { RectangleEqualizer } from "./helper";

const Equalizer = (props): any => {
    let sound: Howl | null = null;
    let intervalId: NodeJS.Timeout | null = null;
    const [dataArray, setData] = useState(new Uint8Array(128));
    const [context, setContext] = useState(null);
    const [RectEq, setRectEq] = useState(null);
    const soundId = useSelector((state: { songsData: any}) => state.songsData.activeSoundId);
    const ref = useRef(NaN);

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
        fillStyle: 'orange',
    };
    // const activePointRef = React.useRef(props.songsDataProp.activeSoundId);

    const canvas = useRef(null);

    const drawEqualByInterval = () => {
        // console.log('drawEqualByInterval setData 1', intervalId);
        intervalId = setInterval(() => {
            setData(arr => Uint8Array.from(Analyser.getFrequency())) ;
        }, 50)
    };

    const isSoundPlaying = (): boolean => !!sound && sound.playing();

    const documentVisibilityHandling = () => {
        if (document.visibilityState === 'hidden' && intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        if (document.visibilityState === 'visible' && isSoundPlaying) {

            drawEqualByInterval();
        }
    };

    useEffect(() => {
        ref.current = props.songsDataProp.activeSoundId;
    }, [props.songsDataProp.activeSoundId]);

    useEffect(() => {
        // console.log('canvas upd', canvas);
        if (canvas) {
            canvas.current.width = canvas.current.offsetWidth;
            canvas.current.height = canvas.current.offsetHeight;
            setContext(canvas.current.getContext('2d')); }
    }, [canvas]);

    useEffect(() => {
        // console.log('context upd', context);
        if (context && canvas) {
            setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height));
            // drawEqualByInterval();
        }
    }, [context]);

    useEffect(() => {
        if (!context || !canvas || !RectEq) { return; }
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetHeight;

        window.requestAnimationFrame(() => RectEq.rectangles(canvas.current.width, canvas.current.height, dataArray));
    }, [dataArray]);

    useEffect(() => {
        console.log('mount');
        setContext(canvas.current.getContext('2d'));

        if (isSoundPlaying && !intervalId) {
            drawEqualByInterval();
        }

        document.addEventListener("visibilitychange", documentVisibilityHandling, false);


        eventBus.on("onPlaySong", () => {
            console.log('onPlaySong', Player.getInstance());

            sound = Player.getInstance();

            if (sound) {
                sound.on('play', () => {
                    Analyser.createAnalyser(sound);
                    // setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height));
                    drawEqualByInterval();
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
        console.log('unmount');

        document.removeEventListener('visibilitychange', documentVisibilityHandling);

        eventBus.remove("onPlaySong");
        clearInterval(intervalId);
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

const mapStateToProps = state => ({
    songsDataProp: state.songsData,
});

export default connect(
    mapStateToProps,
)(Equalizer);
