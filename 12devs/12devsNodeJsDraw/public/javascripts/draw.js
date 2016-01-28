var elementToShare = document.getElementById('draw');
var recorder = RecordRTC(elementToShare, {
    recorderType: CanvasRecorder
});

document.getElementById('start').onclick = function() {
    recorder.startRecording();

    document.getElementById('start').disabled = true;
    setTimeout(function() {
        document.getElementById('stop').disabled = false;
    }, 1000);
};
document.getElementById('stop').onclick = function() {
    this.disabled = true;
    recorder.stopRecording(function(url) {
        var video = document.createElement('video');
        video.src = url;
        video.setAttribute('style', 'height: 100%; position: absolute; top:0;');
        document.body.appendChild(video);
        video.controls = true;
        video.play();
		video.save();
    });
};
document.getElementById('searchwiki').onclick = function() {
window.open('http://localhost:5000');
};
document.getElementById('screenshare').onclick = function() {
window.open('https://localhost:12034');
};
document.getElementById('videocall').onclick = function() {
window.open('http://localhost:5555');
};
window.onbeforeunload = function() {
    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
};

//io = io();
tool.fixedDistance = 20;
// Returns an object specifying a semi-random color
// The color will always have a red value of 0
// and will be semi-transparent (the alpha value)
function randomColor() {
    
    return {
        red: 0,
        green: Math.random(),
        blue: Math.random(),
        alpha: ( Math.random() * 0.25 ) + 0.05
    };
}
// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {
    // Take the click/touch position as the centre of our circle
    var x = event.middlePoint.x;
    var y = event.middlePoint.y;
    // The faster the movement, the bigger the circle
    var radius = event.delta.length / 2;
    // Generate our random color
    var color = randomColor();
    // Draw the circle 
    drawCircle( x, y, radius, color );
    // Pass the data for this circle
    // to a special function for later
    emitCircle( x, y, radius, color );
} 
 
function drawCircle( x, y, radius, color ) {
    // Render the circle with Paper.js
    var circle = new Path.Circle( new Point( x, y ), radius );
    circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );
    // Refresh the view, so we always get an update, even if the tab is not in focus
    view.draw();
} 
 
// This function sends the data for a circle to the server
// so that the server can broadcast it to every other user
function emitCircle( x, y, radius, color ) {

    // Each Socket.IO connection has a unique session id
    var sessionId =  io.io.engine.id;//io.socket.sessionid;
  
    // An object to describe the circle's draw data
    var data = {
        x: x,
        y: y,
        radius: radius,
        color: color
    };

    // send a 'drawCircle' event with data and sessionId to the server
    io.emit( 'drawCircle', data, sessionId )

    // Lets have a look at the data we're sending
    console.log( data )

}
// Listen for 'drawCircle' events
// created by other users
// created by other users
io.on( 'drawCircle', function( data ) {

    console.log( data );

    // Draw the circle using the data sent
    // from another user
    drawCircle( data.x, data.y, data.radius, data.color );
    
})
