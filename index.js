const express = require('express'),
      app = express(),
      router = express.Router(),
      mongoose = require('mongoose'),
      config = require('./config/database'),
      path = require('path'),
      auth = require('./routers/auth')(router),
      bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log('not this time', err);
  } else {
    console.log(config.secret);
    console.log('you are pro !!!')
  }
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', auth)
// parse application/json 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"))
});

app.listen(8080, () => {
    console.log('i`m ON')
});