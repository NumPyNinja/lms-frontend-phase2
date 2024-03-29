
// Install express server 
const express = require('express');
const path = require('path');
const app = express();

const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');


const HOST = "localhost";
//const API_SERVICE_URL = "https://lms-phase2.herokuapp.com/lms/";

const API_SERVICE_URL = "https://lms-backend-service.herokuapp.com/lms";
// Set allowed methods header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: false,
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
