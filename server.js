var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.get('/', function(req, res) {
    res.sendfile('index.html')
});

app.put('/positions/me', function(req, res) {
	var ip = req.ip.toString();
	fs.readFile('positions.json', function (err, data) {
	    if (err) {
	    	res.send(500);
	    	return;
	    }
	    var dataitems=JSON.parse(data.toString());
      	dataitems[ip].x += req.body.top;
      	dataitems[ip].y += req.body.right;
      	var newdata = JSON.stringify(dataitems);
      	fs.writeFile('positions.json', newdata, function(err) {
      		if (err) {
      			res.send(500);
      			return;
      		}
      		var player = {'x': dataitems[ip].x,
      			'y': dataitems[ip].y,
      			'state': dataitems[ip].state.toString()};
      		res.send(JSON.stringify(player));
      	});
	});
});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});