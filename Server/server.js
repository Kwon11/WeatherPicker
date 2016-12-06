var express = require('express')
var http = require('http')
var app = express();
var path = require('path')
var request = require('request')


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
//only breaks when I attempt to access req.data
//req.headers, req.method, req.url are all fine


app.listen(3000, function () {
  console.log('server is started yo')
})