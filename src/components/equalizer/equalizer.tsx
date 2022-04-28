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
    const [onResizeInterval, setOnResizeInterval] = useState(false);

    const ref = useRef({ current: null });
    const intervalRef = useRef(null);

    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
        fillStyle: 'orange',
        height: 150,
    };

    const isContext = (): boolean => {
        return context && RectEq;
    };

    const canvas = useRef(null);

    const handleResizeCanvasChange = (): void => {
        if (isContext()) {
            canvas.current.width = canvas.current.offsetWidth;
            canvas.current.height = canvas.current.offsetHeight;

            RectEq.updateDimensions(canvas.current.offsetWidth, canvas.current.offsetHeight);
        }
    };

    // useEffect(() => {
    //     console.log('onResizeInterval', onResizeInterval);
    //
    //     if (!onResizeInterval) {
    //         setTimeout(() => {
    //             setOnResizeInterval(true);
    //             onResizeWindow();
    //             console.log('resize');
    //         }, 5000);
    //     }
    // }, [onResizeInterval]);


    const onResizeWindow = () => {
        console.log('onResizeWindow');

        setOnResizeInterval(true);
    };

    const drawEqualByInterval = () => {
        const intervalId = setInterval(() => {
            setData(arr => Uint8Array.from(Analyser.getFrequency())) ;
        }, 500);
        intervalRef.current = intervalId;
    };

    const isEqualizerCanStart = (): boolean => {
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
        console.log('onResizeInterval', onResizeInterval);

        if (onResizeInterval) {
            handleResizeCanvasChange();

            setTimeout(() => {
                handleResizeCanvasChange();
                setOnResizeInterval(false);
            }, 5000);
        } else {
            // setTimeout(() => {
            //     setOnResizeInterval(true);
            //     console.log('resize set true');
            // }, 5000);
        }
    }, [onResizeInterval]);

    useEffect(() => {
        console.log('context', context, onResizeInterval);

        if (context && canvas && canvas.current) {
            setRectEq(new RectangleEqualizer(context, canvas.current.width, canvas.current.height));
        }
    }, [context]);

    useEffect(() => {
        if (!isContext()) { return; }
        // canvas.current.width = canvas.current.offsetWidth;
        // canvas.current.height = canvas.current.offsetHeight;

        // setInterval(() => {
        //     context.fillRect(Math.floor(Math.random() * 100), Math.floor(Math.random() * 150), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 150));
        // }, 1000);

        window.requestAnimationFrame(() => {
            if (canvas && canvas.current) {
                RectEq.rectangles(dataArray)
            }
        });
    }, [dataArray]);

    useEffect(() => {
        sound = Player.getInstance();
        // setContext(canvas.current.getContext('2d'));

        if (isEqualizerCanStart()) {
            drawEqualByInterval();
        }

        document.addEventListener("visibilitychange", documentVisibilityHandling, false);
        window.addEventListener("resize", onResizeWindow, false);


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
             className="p-0 border-0"
         >
             <Card.Body
                 className="p-2"
             >
                 <canvas ref={canvas} className="canvas" style={styles}/>
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
