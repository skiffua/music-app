import 'core-js';
import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';

import path from 'path';
import routes from './api/api';

config();

const app = express();

app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, '/../../dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

routes(app);
console.log(process.env.PORT);

app.listen(process.env.PORT || 5000, () => {
    console.log('server worked!');
});

