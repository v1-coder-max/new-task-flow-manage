// app.js — builds and configures the Express app (does NOT start the server)
const path = require('path');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const env = require('./config/env');

const app = express();

app.disable('x-powered-by');            // don't advertise that we use Express

// On Render/Railway a proxy sits in front of our app. Trusting it lets
// req.ip be the REAL user's IP (needed for the rate limiter).
if (env.trustProxy > 0) app.set('trust proxy', env.trustProxy);

app.use(cors());
app.use(express.json({ limit: '10kb' })); // reject huge request bodies

// API
app.use('/api', apiRoutes);
app.use('/api', notFound);              // unknown /api/* URL → JSON 404

// Frontend (login.html, register.html, dashboard.html, css, js)
app.use(express.static(path.join(__dirname, '../../frontend')));

// Must be LAST — catches every error from above
app.use(errorHandler);

module.exports = app;
