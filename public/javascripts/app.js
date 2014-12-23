$(document).ready(function(){

$(document).on('mobileinit', function () {
    $.mobile.pushStateEnabled = false;
});

});

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

socket.on('stateChange', function (data) {
	pinState = data.Current;
    //console.log(pinState);
    setValues(data.Current);
});

function getState(callback){
	$.get('/pinState/', function(roomList){
        callback(roomList);

        setTimeout(function () { 
                setValues(roomList);  
     },1000); 
    });
}

function saveConfig(config) {

    //console.log(config);

    var obj = {};
    obj.data = {};
    obj.data.roomList = config;

    for(var i=0 ; i < config.length; i++) {
        try {
            obj.data.roomList[i].switches = config[i].switches();
        } catch(e) { obj.data.roomList[i].switches = config[i].switches;
        }
    }
   console.log(obj);

    socket.emit('saveSettings', obj);
}

function setValues(roomList){
    console.log('Setting Pin States');
    var switches;
    for(var i=0; i<roomList.data.roomList.length ;i++){
        try{
         switches = roomList.data.roomList[i].switches();
        }catch(e) {
         //console.log(e);
         switches = roomList.data.roomList[i].switches;
        }
        for (var j = 0; j < switches.length; j++) {
            try {
                      $(document).find('#button'+ switches[j].pin).val(switches[j].value).slider('refresh'); 
                } catch(e) {
                    //console.log(e);
                    $(document).find('#button'+ switches[j].pin).slider();
                    $(document).find('#button'+ switches[j].pin).val(switches[j].value).slider('refresh');
            }
        }
    }
}
// roomList.data.roomList[i].