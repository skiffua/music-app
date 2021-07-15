// TODO change to heroku http://localhost:8080
const API_SERVER = process.env.NODE_ENV === 'development'
    ? `${process.env.HOST}:${process.env.PORT}` : '';

const SERVER_ROUTES = {
    LOGIN: API_SERVER + '/api/login',
    REGISTER: API_SERVER + '/api/register',
    SONGS: API_SERVER + '/api/songs',
    LOAD_SONG: API_SERVER + '/api/song/',
};

const USER_FIELDS = {
    USER_EMAIL: 'email',
    USER_PASSWORD: 'password',
    USER_NICK: 'nick',
    USER_GENDER: 'gender'
};

export { API_SERVER, SERVER_ROUTES, USER_FIELDS };
