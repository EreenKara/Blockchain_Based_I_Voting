const express = require("express");
const sequelize = require("./config/database");
const groupRoutes = require("./routes/groupRoutes");
const userAdressRoute = require("./routes/userAdressRoutes");
const userRoutes = require("./routes/userRoutes");
const electionAccessUsersRoutes = require("./routes/electionAccessUsersRoutes"); // Kullanıcı yönlendirmelerini import ediyoruz
require("dotenv").config(); // .env dosyasını yüklemek için

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API documentation for the User Service",
    },
    servers: [
      {
        url: "http://localhost:5004",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/userAdresses", userAdressRoute);
app.use("/api/ElectionAccesUsers", electionAccessUsersRoutes);

// PostgreSQL bağlantısını sağlıyoruz

sequelize.sync().then(() => {
  console.log("Database connected!");
  app.listen(5004, () => console.log("User Service running on port 5004"));
});
