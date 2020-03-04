const API_SERVER = ''; // TODO change to heroku http://localhost:8080

const SERVER_ROUTES = {
    LOGIN: API_SERVER + '/api/login',
    REGISTER: API_SERVER + '/api/register'
};

const USERS_FIELDS = {
    USER_EMAIL: 'userEmail',
    USER_PASSWORD: 'userPassword',
    USER_NICK: 'nick'
};

export { SERVER_ROUTES, USERS_FIELDS };