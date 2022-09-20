const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config({ path: __dirname + "/./../.env" });

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/uws", {
      target: "http://localhost:5001/uws",
      changeOrigin: true,
    })
  );
};
