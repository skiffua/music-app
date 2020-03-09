import { userRegister, userLogin } from '../controllers/user-contoller';


export default (app) => {
    app.post('/api/register', userRegister);
    app.post('/api/login', userLogin);
    app.get('/api/user', () => {console.log('user')});
}