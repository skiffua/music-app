import React from "react";

import Chat from '../components/chat/chat';
import Equalizer from '../components/equalizer/equalizer';

import '../styles/chart.scss';

const Chart = () => {
    return (
        <div
            className="chart-container"
        >
            <Equalizer />
            <Chat />
        </div>
    )
};

export default Chart
