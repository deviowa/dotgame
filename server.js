var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();
var positions = {};

var create = function(req, res, next) {
	var ip = req.ip.toString();
    if(positions[ip]) {
    	next();
    }
    else {
    	positions[ip] = {"x":0,"y":0,"state":"red"};
    	next();
    }
}

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.use(create);

app.get('/', function(req, res) {
    res.sendfile('index.html')
});

app.put('/positions/me', function (req, res) {
	var ip = req.ip.toString();
  	positions[ip].x += req.body.top;
  	positions[ip].y += req.body.right;
	var player = {'x': positions[ip].x,
		'y': positions[ip].y,
		'state': positions[ip].state.toString()};
	res.send(JSON.stringify(player));
});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});