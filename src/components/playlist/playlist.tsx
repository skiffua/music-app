// import './playlist.scss';

import * as React from "react";
import { connect } from 'react-redux';
import { ListGroup } from "react-bootstrap";

import {Howl, Howler} from 'howler';

import { SERVER_ROUTES } from '../../constants/api';

const Playlist = (props): any => {
    interface playlistTrack {
        id: number;
        author: string;
        trackName: string;
        duration: number;
        position?: number;
    }

    const getAudioTrack = (audioTrack: playlistTrack) => {

        const sound = new Howl({
            src: `${SERVER_ROUTES.LOAD_SONG}${audioTrack.id}`,
            format: ['mp3'],
        });

        sound.play();

        // sound.onLoad(() => {
        //     sound.play()
        // })
    };

     return (
         <ListGroup>
             {props.songsDataProp.songList.map((audioTrack: playlistTrack, index: number) => {
                 return (
                     <ListGroup.Item
                         action
                         key={index}
                         onClick={() => getAudioTrack(audioTrack)}
                     >
                         {index + 1}. {audioTrack.author}: {audioTrack.trackName} - {audioTrack.duration}
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
