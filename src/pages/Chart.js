import React, { useEffect } from "react";
import { connect } from 'react-redux';

import Chat from '../components/chat/chat';

import useFetch from "../hooks/useFetch";

import '../styles/chart.scss';
import { SERVER_ROUTES } from "../constants/api";
import { getSongsList } from "../store/actions/songsActions";

const Chart = (props) => {
    const [{isLoading, response, error}, doFetch] = useFetch();

    useEffect(() => {
            doFetch(SERVER_ROUTES.SONGS, { method: 'get'});
        },
        []);

    useEffect(() => {

            if (response) { props.getSongsListToProp(response.data);}
        },
        [response]);

    return (
        <div
            className="chart-container"
        >
            Чарт
            <Chat />
        </div>
    )
};

export default connect(
    undefined,
    {
        getSongsListToProp: getSongsList,
    }
)(Chart)
