var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('index.html')
});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});