const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Title',
    version: '1.0.0',
    description: 'API Description',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'], // Aqui você deve informar o caminho dos seus arquivos .ts
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;