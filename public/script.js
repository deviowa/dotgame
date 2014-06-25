var right = 0;
var up = 0;

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