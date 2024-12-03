#!/usr/bin/env node

// Pre-Checks
const datadir = process.argv[2];
const port = process.argv[3];

if(!datadir) {
    console.log('Data directory is not defined! Define as first argument!');
    process.exit(1);
}

// Import Dependencies
import Express from 'express';
import CookieParser from 'cookie-parser';
import RequestLogger from './middlewares/requestlogger.js';
import Session from './lib/session.js';
import SessionInjector from './middlewares/sessioninjector.js';
import Authentication from './middlewares/authentication.js';
import config from './config.js';

// Constants
const app = Express();
const session = new Session(config.access.session_timeout);

// Import Routes
import login from './routes/login.js';

// Use middleware
app.use(CookieParser());
app.use(RequestLogger);
app.use(SessionInjector(session));

// Route for performing authentication
app.use('/login', login);

// Main routes (with authentcation)
app.use(Authentication);
app.use('/', Express.static(datadir));

// Make app listen to port
app.listen(port || config.port);
console.log(`Server is listenting on port ${port || config.port}`);