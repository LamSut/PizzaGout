const express = require('express');
const cors = require('cors');

const JSend = require('./jsend');
const productRouter = require('./routes/product-router');
const {
    resourceNotFound,
    handleError,
} = require('./controllers/error-controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json(JSend.success());
});

productRouter.setup(app);
//404 res
app.use(resourceNotFound);
// Define error-handling middleware last, after other app.use() and routes calls
app.use(handleError);

module.exports = app;