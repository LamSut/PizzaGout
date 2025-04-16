require('dotenv').config();
const host = process.env.SWAGGER_HOST || 'localhost';
const port = process.env.SWAGGER_PORT || '3000';

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Pizza Website API',
            version: '1.0.0',
        },
        servers: [
            {
                url: `http://${host}:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/docs/components.yaml'],
};
const specs = swaggerJsdoc(options);
module.exports = {
    specs,
    swaggerUi,
};