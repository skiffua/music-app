const API_SERVER = ''; // TODO change to heroku http://localhost:8080

const SERVER_ROUTES = {
    LOGIN: API_SERVER + '/api/login',
    REGISTER: API_SERVER + '/api/register'
};

const USER_FIELDS = {
    USER_EMAIL: 'email',
    USER_PASSWORD: 'password',
    USER_NICK: 'nick',
    USER_GENDER: 'gender'
};

export { SERVER_ROUTES, USER_FIELDS };