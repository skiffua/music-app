// import './playlist.scss';

import * as React from "react";
import {ListGroup} from "react-bootstrap";

const Playlist = (): any => {
    interface playlistTracks {
        id: number;
        author: string;
        trackName: string;
        duration: number;
        position?: number;
    }

    const playlistTracksMock: playlistTracks[] = [
        {
            id: 1,
            author: 'author1',
            trackName: 'trackName1',
            duration: 180,
        },
        {
            id: 2,
            author: 'author2',
            trackName: 'trackName2',
            duration: 180,
        }];

     return (
         <ListGroup>
             {playlistTracksMock.map((audioTrack: playlistTracks, index: number) => {
                 return (<ListGroup.Item key={index}>{audioTrack.author}: {audioTrack.trackName} - {audioTrack.duration}</ListGroup.Item>);
             })}
         </ListGroup>
        );
};

export default Playlist;
