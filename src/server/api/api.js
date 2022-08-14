import { userRegister, userLogin } from '../controllers/user-contoller';
import { getSongsList, getSong } from '../controllers/songs-contoller';


export default (app) => {
    app.post('/api/register', userRegister);
    app.post('/api/login', userLogin);
    // app.get('/api/user', () => {console.log('user')});
    app.get('/api/songs', getSongsList);
    app.get('/api/song/:id', getSong);
}
