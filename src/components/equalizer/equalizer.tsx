import * as React from "react";
import { Howl } from 'howler';
import { connect } from 'react-redux';

import { Analyser, Player } from "../playlist/player";
import { useEffect, useRef, useState } from "react";
import { eventBus } from "../../event-bus/event-bus";
import { Card } from "react-bootstrap";
import './equlizer.scss';
import { RectangleEqualizer } from "./helper";

const Equalizer = (props): any => {
    let sound: Howl | null = null;
    const [dataArray, setData] = useState(new Uint8Array(128));
    const [context, setContext] = useState(null);
    const [RectEq, setRectEq] = useState(null);
    const ref = useRef({ current: null });
    const intervalRef = useRef(null);

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
        fillStyle: 'orange',
    };

    const canvas = useRef(null);

    const drawEqualByInterval = () => {
        const intervalId = setInterval(() => {
            console.log('setInterval1', intervalId);

            setData(arr => Uint8Array.from(Analyser.getFrequency())) ;
        }, 100);
        intervalRef.current = intervalId;
        // console.log('setInterval2', intervalId, intervalRef.current);
    };

    useEffect(() => {
        console.log('intervalRef.current', intervalRef.current);
    }, [intervalRef.current]);

    const isEqualizerCanStart = (): boolean => {
        console.log('intervalRef.current', intervalRef.current);

        return document.visibilityState === 'visible' && !intervalRef.current && !!sound && sound.playing();
    };

    const clearFreqUpdate = (): void => {
        clearInterval(intervalRef.current);
        intervalRef.current  = null;
    };

    const documentVisibilityHandling = () => {
        if (document.visibilityState === 'hidden' && intervalRef.current) {
            clearFreqUpdate();
        }

        if (isEqualizerCanStart()) {
            drawEqualByInterval();
        }
    };

    const onPlaySongHandler = (e) => {
        console.log('onPlaySong', e);

        clearFreqUpdate();

        sound = Player.getInstance();

        if (sound) {
            sound.on('play', () => {
                console.log('play');

                Analyser.createAnalyser(sound);

                if (isEqualizerCanStart()) {
                    drawEqualByInterval();
                }
            });

            sound.on('pause', () => {
                clearFreqUpdate();
            });

            sound.on('stop', () => {
                console.log('stop');

                clearFreqUpdate();
            });

            sound.on('end', () => {
                console.log('end');

                clearFreqUpdate();
            });
        }
    };

    useEffect(() => {
        ref.current = props.songsDataProp.activeSoundId;

        clearFreqUpdate();
    }, [props.songsDataProp.activeSoundId]);

    useEffect(() => {
        if (canvas) {
            canvas.current.width = canvas.current.offsetWidth;
            canvas.current.height = canvas.current.offsetHeight;
            setContext(canvas.current.getContext('2d'));
        }
    }, [canvas]);

    useEffect(() => {
        if (context && canvas && canvas.current) {
            setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height));
        }
    }, [context]);

    useEffect(() => {
        if (!context || !RectEq) { return; }
        canvas.current.width = canvas.current.offsetWidth;
        canvas.current.height = canvas.current.offsetHeight;

        window.requestAnimationFrame(() => {
            if (canvas && canvas.current) {
                RectEq.rectangles(canvas.current.width, canvas.current.height, dataArray)
            }
        });
    }, [dataArray]);

    useEffect(() => {
        sound = Player.getInstance();
        setContext(canvas.current.getContext('2d'));

        if (isEqualizerCanStart()) {
            drawEqualByInterval();
        }

        document.addEventListener("visibilitychange", documentVisibilityHandling, false);

        eventBus.on("onPlaySong", onPlaySongHandler);

        return () => {
            clearFreqUpdate();

            document.removeEventListener('visibilitychange', documentVisibilityHandling);
            eventBus.remove('onPlaySong', onPlaySongHandler);
            // console.log(document)
        }
    }, []);

     return (
         <Card
             className="audio-player p-0"
         >intervalRef.current {intervalRef.current}
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
