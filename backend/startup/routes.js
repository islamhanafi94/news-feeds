const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const sources = require('../routes/sources');
const news = require('../routes/news');
const authMiddleware = require('../middlewares/auth');


module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/sources', [authMiddleware, sources]);
    app.use('/api/news', [authMiddleware, news]);
}

