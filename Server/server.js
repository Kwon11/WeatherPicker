var express = require('express')
var http = require('http')
var app = express();
var path = require('path')



app.use(express.static(path.join(__dirname + '/../')));
app.use(express.static(path.join(__dirname + '/../' + 'client/')));
app.use(require('body-parser').json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../' + 'client/index.html'));
})

app.post('/weather', function (req, res) {
  var location = req.body.location;
  console.log(location);
  res.status(201).send('yo')
})
//only breaks when I attempt to access req.data
//req.headers, req.method, req.url are all fine


app.listen(3000, function () {
  console.log('server is started yo')
})