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
    for(var i in data)  {
        
        // Get IP address
        var ipAdd = data[i];

        // Get x,y, and color attributes
        var xCoor = ipAdd.x + "px";
        var yCoor = ipAdd.y + "px";
        var mycolor =  '' + ipAdd.color;
    
        //Write data out to new div to inside of board container object
        $('#container').append("<div id= " + ipAdd + "><div>");
        $('#'+ipAdd).append("<class=" + mycolor + ">");
        $('#'+ipAdd).css("left", xCoor)
        $('#'+ipAdd).css("top", yCoor);

    }
          
}

