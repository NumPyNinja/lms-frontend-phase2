// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/lms-frontend-phase2'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/lms-frontend-phase2/'}),
// );

// // Start the app by listening on the default Heroku port


// Install express server 
const express = require('express');
const path = require('path');
const app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/lms-frontend-phase2'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/lms-frontend-phase2/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);