var express = require('express')
var http = require('http')
var app = express();
var path = require('path')


app.use(express.static(path.join(__dirname + '/../')));
app.use(express.static(path.join(__dirname + '/../' + 'client/')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../' + 'client/index.html'));
})

app.post('/weather', function (req, res) {
  res.status(200).send('was up girl frannn')
})

app.listen(3000, function () {
  console.log('server is started yo')
})