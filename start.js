const mongoose = require('mongoose');


mongoose.connect('mongodb://mongodb5369os:no7sad@danu7.it.nuigalway.ie:8717/mongodb5369');
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

// Import all of our models
require('./models/User');
require('./models/Post');
require('./models/Comment');


// Start our app!
const app = require('./app');

app.set('port', 8999);
const server = app.listen(app.get('port'), () => {
  console.log('##########################################################');
  console.log('#####               STARTING SERVER                  #####');
  console.log('##########################################################\n');
  console.log(`Express running on ` + server);
});
