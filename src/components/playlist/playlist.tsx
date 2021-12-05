// import './playlist.scss';

import * as React from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { ListGroup } from "react-bootstrap";

import { Howl } from 'howler';
import { Player } from "./player";

import { setActiveSong } from "../../store/actions/songsActions";

import { SERVER_ROUTES } from '../../constants/api';
import {platform} from "os";

const Playlist = (props): any => {
    interface playlistTrack {
        id: number;
        author: string;
        trackName: string;
        duration: number;
        position?: number;
    }

    const getAudioTrack = (audioTrackId: number) => {

        console.log('audioTrackId', audioTrackId);

        const sound = Player.createInstance({
            src: `${audioTrackId}`,
            onend: () => {
                getAudioTrack(getNextSongNumber(audioTrackId))
            },
        });

        if (sound.playing()) {
            sound.seek(0);
        } else {
            sound.play();
            Player.getContext();
            setInterval(() => Player.getFrequency(), 1000)
        }

    //     const sound = new Howl({
    //         src: `${SERVER_ROUTES.LOAD_SONG}${audioTrackId}`,
    //         format: ['mp3'],
    //         onload: () => {
    //             props.setActiveSongToState(sound);
    //             setNewSongId(audioTrackId);
    //             setNewSong(sound);
    //             },
    //         onend: () => {
    //             getAudioTrack(getNextSongNumber(audioTrackId))
    //         },
    //     });
    };

    const getNextSongNumber = (currentNumber: number): number => {
        const allSongsCount: number = props.songsDataProp.songList.length;

        if (currentNumber < allSongsCount) {
            return ++currentNumber;
        }

        return 1;
    };

     return (
         <ListGroup>
             {props.songsDataProp.songList && props.songsDataProp.songList
                 .map((audioTrack: playlistTrack, index: number) => {
                 return (
                     <ListGroup.Item
                         action
                         key={index}
                         onClick={() => getAudioTrack(audioTrack.id)}
                     >
                         { index + 1 }. { audioTrack.author } - { audioTrack.trackName } : { audioTrack.duration }
                     </ListGroup.Item>
                 );
             })}
         </ListGroup>
        );
};

const mapStateToProps = state => ({
    songsDataProp: state.songsData,
});

export default connect(
    mapStateToProps,
    {
        setActiveSongToState: setActiveSong,
    }
)(Playlist);
