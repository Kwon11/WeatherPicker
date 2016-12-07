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
  // var temperature = req.body.temperature; wont need this till later
  var addZero = function (value) {
    value = value + '';
    if (value.length === 1) {
      return '0' + value;
    } else {
      return value;
    }
  };
  var makeRightTime = function () {
    var time = new Date();

    var year = addZero(time.getUTCFullYear());
    var month = addZero(time.getUTCMonth()+1);
    var date = addZero(time.getUTCDate());
    var hours = addZero(time.getUTCHours());
    var minutes = addZero(time.getUTCMinutes());
    var seconds = addZero(time.getUTCSeconds());

    time = '' + year + '-' + month + '-' + date + 'T' + hours +'%3A' + minutes + '%3A' + seconds +'.' + time.getMilliseconds() +'Z';
    return time;
  };



  var time = makeRightTime();
  var keyWord = 'sweater';
  var unsignedURL = 'GET\nwebservices.amazon.com\n/onca/xml\nAWSAccessKeyId=AKIAIGWO344NTRJN35AA&AssociateTag=chanthemancan-20&Keywords=' + keyWord + '&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COfferSummary&SearchIndex=Fashion&Service=AWSECommerceService&Sort=price&Timestamp' + time;

  function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

  // var hmac = crypto.createHmac('sha256', 'kaJQsMskJ4bFpm+nKfqrdukLjQrZtwsEZSLQWYEu');
  unsignedURL = fixedEncodeURIComponent(unsignedURL);
  var signature = crypto.createHmac('sha256', 'kaJQsMskJ4bFpm+nKfqrdukLjQrZtwsEZSLQWYEu').update(unsignedURL).digest('base64');
  signature = encodeURI(signature);

  var signedRequest = 'http://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAIGWO344NTRJN35AA&AssociateTag=chanthemancan-20&Keywords=' + keyWord + '&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COfferSummary&SearchIndex=Fashion&Service=AWSECommerceService&Sort=price&Timestamp=' + time + '&Signature=' + signature; //example signed
  request.get({//send api request to store
    url: signedRequest
  }, function success(error, response) {
    if (error) {
      console.log('amazon api problem');
    }
    console.log(response.body);
    res.status(201).send(response);
  });
})




app.listen(3000, function () {
  console.log('server is started yo');
})