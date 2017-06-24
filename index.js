const express = require('express'),
      app = express(),
      router = express.Router(),
      mongoose = require('mongoose'),
      config = require('./config/database'),
      path = require('path'),
      auth = require('./routers/auth')(router),
      bodyParser = require('body-parser'),
      cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log('not this time', err);
  } else {
    console.log(config.secret);
    console.log('you are pro !!!')
  }
});


app.use(cors());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/auth', auth);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"))
});

app.listen(8080, () => {
    console.log('i`m ON')
});