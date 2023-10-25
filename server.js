require('dotenv').config()
const express = require('express');
// const https = require("https");
// const fs = require('fs');

const session = require("express-session");
const mongoose = require('mongoose');
const MongoStorage = require("connect-mongo");
const passport = require("passport");

const cookieParser = require('cookie-parser');

const morgan = require('morgan')
const cors = require('cors')

// Routes
const AuthRouter = require('./routes/Auth');
const ProfileRouter = require('./routes/Profile')
const ClientRouter = require('./routes/clientRequests')
const APIRouter = require('./routes/api')

const ErrorHandler = require('./controllers/errorHandler')


const server = express();

server.use(cors({ origin: process.env.ALLOWED_ORIGIN.split(', ') , credentials: true }))
server.use(morgan('dev'))

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ extended: false }));

server.use('/public',express.static("./public"))

server.use(session({
    name: "keyBox_ID",
    secret: "secretText",
    resave: false,
    saveUninitialized: false,
    store: new MongoStorage({
        mongoUrl: process.env.DB_STRING,
        dbName: 'junction',
    }),
    cookie:
    {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: true,
        // sameSite: "none",
    }
}));

// server.use(cookieParser("secretText"));
require('./utils/passport');
server.use(passport.initialize());
server.use(passport.session());

// Getters router
server.use('/api', APIRouter);
// Authentication related
server.use('/auth', AuthRouter);
// Personal Profile related
server.use('/profile', ProfileRouter);
// Client related
server.use('/client', ClientRouter)
// default route
server.use('/', (req, res, next) => res.send('welcome to meralbooks backend server'))

// Error handling
server.use(ErrorHandler);

module.exports.mongoose = mongoose;
module.exports.server = server;
