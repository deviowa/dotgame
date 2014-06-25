var right = 0;
var up = 0;

// Update Board Function
// Make function to update board data displayed
//
// Make call to server to get x,y location and color of each user
//
// Create function that takes in data as json file
// For each user in json data, create a new point in the board representing each user

function updateBoard(data) {

    //Empty board 
    $('#container').empty;


    // For every key in obejct
    for (var i in data) {

        // Get IP address
        var ipAdd = data[i];

        // Get x,y, and color attributes
        var xCoor = ipAdd.x + "%";
        var yCoor = ipAdd.y + "%";
        var mycolor = '' + ipAdd.color;

        //Write data out to new div to inside of board container object
        $('#container').append("<div id= " + ipAdd + "><div>");
        $('#' + ipAdd).append("<class=" + mycolor + ">");
        $('#' + ipAdd).css("left", xCoor)
        $('#' + ipAdd).css("top", yCoor);

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
                if (MATH.abs(data[i].x - data[j].x) <= 1) {
                    if (MATH.abs(data[i].y - data[j].y) <= 1) {
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
}

function update() {

    $.ajax({
        url: '/positions/me',
        type: "PUT",
        data: JSON.stringify({
            top: top,
            right: right
        }),
        success: function(data) {
            updateBoard(data);
        },
        contentType: "application/json"
    });

    right = 0;
    up = 0;

}

$(function() {

    $(document).on("keydown", function(e) {
        if (e.keyCode === 37) {
            //console.log('Left');
            right -= 1;
            //console.log("Right: " + right);
        } else if (e.keyCode === 38) {
            //console.log('Up');
            up += 1;
            //console.log("Up: " + up);
        } else if (e.keyCode === 39) {
            //console.log('Right');
            right += 1;
            //console.log("Right: " + right);
        } else if (e.keyCode === 40) {
            //console.log('Down');
            up -= 1;
            //console.log("Up: " + up);
        }
    });

    var timer = setInterval(function() {
        update()
    }, 100);

})