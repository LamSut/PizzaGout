const session = require('express-session');

module.exports = session({
    secret: 'B2111933',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    }
})