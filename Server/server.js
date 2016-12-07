var express = require('express')
var http = require('http')
var app = express();
var path = require('path')
var request = require('request')
var crypto = require('crypto')


app.use(express.static(path.join(__dirname + '/../')));
app.use(express.static(path.join(__dirname + '/../' + 'client/')));
app.use(require('body-parser').json());


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../' + 'client/index.html'));
})
app.post('/weather', function (req, res) {
  var location = req.body.location;
  var temperature;
  request.get({
    url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=London,uk&units=metric&cnt=7&APPID=c3d481293964d966c396cd585f609998",
  }, function success(error, response) {
    res.status(201).send(response);
  });
})

app.post('/clothes', function (req, res) {
  if (req.body.temperature < 30) {
    res.sendFile(path.join(__dirname + '/../' + 'bullshit/page.html'));
  } else {
    res.sendFile(path.join(__dirname + '/../' + 'bullshit/page1.html'));
  }

})




app.listen(3000, function () {
  console.log('server is started yo');
})