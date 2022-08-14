import './playlist.scss';
import * as React from "react";
import { connect } from 'react-redux';
import { ListGroup } from "react-bootstrap";

import { Howl } from 'howler';
import {Analyser, Player, PlayerInstance} from "./player";

import { setActiveSong, setActiveSoundId } from "../../store/actions/songsActions";
import { useEffect } from "react";
import {eventBus} from "../../event-bus/event-bus";

const Playlist = (props): any => {
    interface playlistTrack {
        id: number;
        author: string;
        track_name: string;
        duration: number;
        position?: number;
    }

    // useEffect(() => {
    //     console.log('PlayerInstance', PlayerInstance);
    //     if (PlayerInstance?.isEnd) {
    //         console.log('PlayerInstance', PlayerInstance?.isEnd);
    //
    //         getAudioTrack(getNextSongNumber(1))
    //     }
    // }, [PlayerInstance]);

    const getAudioTrack = (audioTrackId: number) => {
        const sound: Howl = Player.createInstance({
            src: `${audioTrackId}`,
            // onend: () => {
            //     getAudioTrack(getNextSongNumber(audioTrackId))
            // },
        });

        sound.on('end', () => {
            getAudioTrack(getNextSongNumber(audioTrackId))
        });

        if (sound.playing()) {
            sound.seek(0);
        } else {
            props.setActiveSoundIdToState(sound.play());
            // Player.createAnalyser();
            // setInterval(() => Player.getFrequency(), 1000)
        }

        eventBus.dispatch("onPlaySong");

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
         <ListGroup className="overflow-auto flex-grow-0 list-group">
             {props.songsDataProp.songList && props.songsDataProp.songList
                 .map((audioTrack: playlistTrack, index: number) => {
                 return (
                     <ListGroup.Item
                         action
                         key={index}
                         onClick={() => getAudioTrack(audioTrack.id)}
                     >
                         { index + 1 }. { audioTrack.author } - { audioTrack.track_name } : { audioTrack.duration }
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
        setActiveSoundIdToState: setActiveSoundId,
    }
)(Playlist);
