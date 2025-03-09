const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use(
  "/user",
  createProxyMiddleware({
    target: "http://user-service:5004",
    changeOrigin: true,
  })
);
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://auth-service:5000",
    changeOrigin: true,
  })
);
app.use(
  "/election",
  createProxyMiddleware({
    target: "http://election-service:5001",
    changeOrigin: true,
  })
);
app.use(
  "/option",
  createProxyMiddleware({
    target: "http://option-service:5002",
    changeOrigin: true,
  })
);
app.use(
  "/vote",
  createProxyMiddleware({
    target: "http://vote-service:5005",
    changeOrigin: true,
  })
);
app.use(
  "/result",
  createProxyMiddleware({
    target: "http://result-service:5003",
    changeOrigin: true,
  })
);
app.use(
  "/email",
  createProxyMiddleware({
    target: "http://email-service:5006",
    changeOrigin: true,
  })
);
app.listen(3000, () => console.log("API Gateway running on port 3000"));
