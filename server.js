var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var app = express();

var positions = {};
var timers = {};
var frozen = {};


var create = function(req, res, next) {
    var ip = req.ip.toString();

    var color = Math.random() * 2;

    if (positions[ip]) {
        next();
    } else {
        positions[ip] = {
            "x": Math.floor(100 * Math.random()),
            "y": Math.floor(100 * Math.random()),
            "state": (color >= 1 ? "red" : "green")
        };
        next();
    }
}

//Function to examine the server response data and see if there are any new collisions.
    function detectCollision(data) {
        for (var i in data) {
            //If the outer element is already frozen, skip iterating over the inner loop
            if (data[i].state === 'frozen') {
                continue;
            }
            for (var j in data) {
                //If the inner element is already frozen OR the two elements have the same IP address, move to the next element
                if (data[j].state === 'frozen' || i === j) {
                    continue;
                } else {
                    //If the difference in X coordinates is 1 or less, check Y
                    if (Math.abs(data[i].x - data[j].x) <= 4) {
                        if (Math.abs(data[i].y - data[j].y) <= 4) {
                            //New collision detected. Return the IPs.
                            var ips = [];
                            ips.push(i);
                            ips.push(j);
                            return ips;
                        }
                    }
                }

            }
        }
        return;
    }

app.use(express.static(__dirname + '/public'));

app.use(bodyParser());

app.use(create);

app.get('/', function(req, res) {
    res.sendfile('index.html')
});

app.put('/positions/me', function(req, res) {
    var ip = req.ip.toString();

    clearTimeout(timers[ip]);
    timers[ip] = setTimeout(function() {
        delete positions[ip];
        delete timers[ip];
    }, 2000);

    //Store IPs of colliding players
    var collision = detectCollision(positions);

    //If the array is defined
    if (collision) {
        //For each player who is colliding
        collision.forEach(function(ip) {
            //If the player is Green, freeze them for 5 seconds then make them red
            if (positions[ip].state === "green") {
                positions[ip].state = "frozen";
                frozen[ip] = setTimeout(function() {
                    console.log(positions);
                    console.log(collision);
                    var color = Math.random() * 2;
                    positions[ip].state = (color >= 1 ? "red" : "green");
                    delete frozen[ip];
                }, 5000);
            }
        });
    }

    if (positions[ip].state != "frozen") {
        positions[ip].x += req.body.right;
        positions[ip].y -= req.body.top;
    } else {
        //console.log("FROZEN AHHHH");
    }

    if (positions[ip].x >= 95) positions[ip].x = 95;
    else if (positions[ip].x <= 0) positions[ip].x = 0;
    if (positions[ip].y >= 95) positions[ip].y = 95;
    else if (positions[ip].y <= 0) positions[ip].y = 0;

    res.send(JSON.stringify(positions));
});

console.log("Starting to listen");

var server = app.listen(3000, function() {
    console.log('Listening on port' + server.address().port);
});