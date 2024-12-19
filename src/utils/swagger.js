const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0", // Specifies the OpenAPI version
  info: {
    title: "TO DO API Documentation", // Title of your API
    version: "1.0.0", // Version of your API
    description: "This is the API documentation for my app.", // Description
  },
  servers: [
    {
      url: "http://localhost:5000", // API server URL
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your API route files for JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
