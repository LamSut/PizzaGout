const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/error-controller');
const { specs, swaggerUi } = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});
redisClient.on('error', (err) => console.error('Redis client error', err));
redisClient.connect().catch(console.error);

let redisStore = new RedisStore({ client: redisClient, prefix: 'myapp:sess:' });
app.use(
    session({
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

// Get session
app.get('/api/v1', (req, res) => {
    const cartId = req.session.cartId;
    res.json(JSend.success({ cartId }));
});

// Clear session
app.get('/api/v1/clear', (req, res) => {
    req.session.cartId = null;
    const cartId = req.session.cartId;
    res.json(JSend.success({ cartId }));
});

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/public', express.static('public'));

productRouter.setup(app);
cartRouter.setup(app);

// 404 res
app.use(resourceNotFound);

// Define error-handling middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;
