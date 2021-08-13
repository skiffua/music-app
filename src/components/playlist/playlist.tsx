// import './playlist.scss';

import * as React from "react";
import { useState } from "react";
import { connect } from 'react-redux';
import { ListGroup } from "react-bootstrap";

import { Howl } from 'howler';

import { SERVER_ROUTES } from '../../constants/api';

const Playlist = (props): any => {
    interface playlistTrack {
        id: number;
        author: string;
        trackName: string;
        duration: number;
        position?: number;
    }

    const [currentSong, setNewSong] = useState(null);
    const [currentSongId, setNewSongId] = useState(null);

    const getAudioTrack = (audioTrackId: number) => {
        if (currentSongId) {
            currentSong.unload();
        }

        const sound = new Howl({
            src: `${SERVER_ROUTES.LOAD_SONG}${audioTrackId}`,
            format: ['mp3'],
            onload: (s) => {
                setNewSongId(audioTrackId);
                setNewSong(sound);
                },
            onend: () => {
                getAudioTrack(getNextSongNumber(audioTrackId))
            },
        });

        sound.play();
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
)(Playlist);
