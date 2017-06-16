const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      config = require('./config/database'),
      path = require('path');

let configObj = {
  exStatic: express.static(__dirname + '/client/dist/'),
  sendFIle: path.join(__dirname + "/client/dist/index.html")
}

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log('not this time', err);
  } else {
    console.log(config.secret);
    console.log('you are pro !!!')
  }
});

app.use(configObj.exStatic);

app.get('*', (req, res) => {
  res.sendFile(configObj.sendFIle)
});

app.listen(8080, () => {
    console.log('i`m ON')
});