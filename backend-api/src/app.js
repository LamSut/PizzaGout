const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const productRouter = require('./routes/product-router');
const cartRouter = require('./routes/cart-router');
const itemRouter = require('./routes/item-router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/error-controller');
const { specs, swaggerUi } = require('./docs/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/public', express.static('public'));

productRouter.setup(app);
cartRouter.setup(app);
//itemRouter.setup(app);
//404 res
app.use(resourceNotFound);
// Define error-handling middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;