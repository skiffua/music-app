import openSocket from 'socket.io-client';
// TODO change to heroku
const socketHost = process.env.NODE_ENV === 'development'
    ? `${process.env.HOST}:${process.env.PORT}` : '';
const socket = openSocket(socketHost);

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

function subscribeToErrorMessage(cb) {
    socket.on('newMessageError', message => {

            console.log('error 50');
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
    subscribeToErrorMessage,
};
