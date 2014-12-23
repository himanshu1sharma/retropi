
//var socket = io.connect('http://localhost:3000');
//var socket = io.connect('http://app.himanshusharma.info');
var socket = io.connect('http://192.168.0.8:3000');
var pinState;

var xbmc = function() {
    socket.emit('xbmc');
}

var mame = function() {
    socket.emit('mame');
}

function turnOn(pinNumber){
	socket.emit('turnOn', {pin : pinNumber});
};

function turnOff(pinNumber){
    socket.emit('turnOff', {pin : pinNumber});
};