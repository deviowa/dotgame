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
    $('.container').empty();

    // For every key in obejct
    for (var i in data) {

        // Get IP address
        var ipAdd = data[i];

        // Get x,y, and color attributes
        var xCoor = ipAdd.x + "%";
        var yCoor = ipAdd.y + "%";
        var mycolor = '' + ipAdd.state;

        var blockDiv = $("<div><div>");

        blockDiv.addClass(mycolor);
        blockDiv.css("left", xCoor)
        blockDiv.css("top", yCoor);

        $('.container').append(blockDiv);

    }

}


function update() {

    $.ajax({
        url: '/positions/me',
        type: "PUT",
        data: JSON.stringify({
            top: up,
            right: right
        }),
        success: function(data) {
            updateBoard(JSON.parse(data));
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