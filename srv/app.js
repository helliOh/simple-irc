import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import compression from 'compression';
import cors from 'cors';

import router from './routes';
import socketServer from './socket'

import Sequelize from './models/index';
const { sequelize } = Sequelize;

const port = 4000;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(compression());

if(process.env.FORCE) sequelize.sync({force:true});

router(app);

app.io = socketServer;//hi

module.exports = app;
