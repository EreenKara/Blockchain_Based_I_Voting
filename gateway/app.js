require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mikroservislerin adresleri
const SERVICES = {
  user: "http://localhost:5004",
  auth: "http://localhost:5000",
  election: "http://localhost:5001",
  option: "http://localhost:5002",
  vote: "http://localhost:5005",
  result: "http://localhost:5003",
  email: "http://localhost:5006",
};

// Proxy yönlendirmeleri
Object.keys(SERVICES).forEach((service) => {
    app.use(
      `/${service}`,
      createProxyMiddleware({
        target: SERVICES[service],
        changeOrigin: true,
        pathRewrite: { [`^/${service}`]: `/api/${service}s` }, // "/user/register" → "http://localhost:5001/api/users/register"
      })
    );
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway ${PORT} portunda çalışıyor...`);
});
