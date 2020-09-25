import openSocket from 'socket.io-client';
// TODO change to heroku
const socket = openSocket(`${process.env.HOST}:${process.env.SOCKET_PORT}`);

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
}

function subscribeToMessages(cb) {
    socket.on('newMessage', message => {

        return cb(null, message)
    }
    );
}

function sendMessage(userName, message) {
    socket.emit('sendMessage', { userName, message});
}

export {
    subscribeToTimer,
    subscribeToMessages,
    sendMessage,
};
