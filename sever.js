
// Install express server 
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');


const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');


const HOST = "localhost";
const API_SERVICE_URL = "https://lms-backend-service.herokuapp.com/lms/";

//Enable CORS FOR AL ENDPOINTS

app.use(cors({
  origin: 'https://lms-frontend.herokuapp.com'
}));

 Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: '',
    },
 }));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/lms-frontend-phase2'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/lms-frontend-phase2/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
