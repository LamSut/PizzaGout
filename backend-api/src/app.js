const express = require('express');
const cors = require('cors');
const productRouter = require('./routes/product-router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json({
        message: 'ok'
    });
});

productRouter.setup(app);

module.exports = app;