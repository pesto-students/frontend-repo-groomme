import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Groomme API's",
    version: "1.0.0",
    description: "API for user registration",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
    {
      url: "https://groommebe.onrender.com",
      description: "Render deployed test server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/documentation/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
