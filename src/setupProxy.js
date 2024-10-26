// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/openai',
    createProxyMiddleware({
      target: 'https://defi-risk-analysis.vercel.app',
      changeOrigin: true,
      secure: false,
    })
  );
};