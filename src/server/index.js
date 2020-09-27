import 'core-js';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

import path from 'path';
import routes from './api/api';

const env = process.env.NODE_ENV || 'development';

config({
    path: `./.env.${env === "production" ? "prod" : "dev"}`,
});

const app = express();
// const server = http.createServer(app);

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '/../../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

routes(app);
console.log('process.env.PORT', process.env.PORT);

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('server worked!');
});

const io = socketIO(server);
// io.listen(process.env.SOCKET_PORT || 6969);

io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval);
    });

    client.on('sendMessage', (data) => {
        sendToClient(data);
    });

    const sendToClient = (data) => {
        console.log(data);

        io.emit('newMessage', { userName: data.userName, message: data.message });
    }
});

