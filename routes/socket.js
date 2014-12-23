var fnRouter  = require('./piRouter.js')
var fs = require('fs');
var pins = new Object;

// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;



fs.readFile("pinstate.json", 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
  pins = data;
  console.log(JSON.stringify(data));
  
});

function assignPin(data,state) {

  for(var i=0; i< pins.data.roomList.length ;i++){
        for (var j = 0; j < pins.data.roomList[i].switches.length; j++) {
          if(data.pin == pins.data.roomList[i].switches[j].pin){
            if(state=='high') {
              console.log('here');
              pins.data.roomList[i].switches[j].value='on';
            } else if (state == 'low') {
              pins.data.roomList[i].switches[j].value='off';
            }
          } 
        }
      }
  writeToFile(pins);
} 

function writeToFile(data) {
fs.writeFile("pinstate.json", JSON.stringify(data), function(err) {
            if(err) {
                console.log(err);
          } else {
                console.log("The file was saved!");
          }
        }); 
}

exports.socket = function (io) {
  io.sockets.on('connection', function(socket) {
	socket.emit('state', { Current: pins });
  	
    socket.on('xbmc', function () {

      child = exec("./killmame.sh", function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }

          child = exec("xbmc", function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      });

      });
      
    });

    socket.on('mame', function () {

        child = exec("./killxbmc.sh", function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }

          child = exec("/usr/local/bin/indiecity/InstalledApps/mame4all_pi/Full/./mame", function (error, stdout, stderr) {
            sys.print('stdout: ' + stdout);
            sys.print('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      });

      });


      
    });




    socket.on('turnOn', function (data) {
  		var request = new Object();
  		request.body = data;        	
      fnRouter.turnON(request,function(results){
    		//console.log(results);
        assignPin(data,'high');
        socket.emit('stateChange', { Current: pins });
    		socket.broadcast.emit('stateChange', { Current: pins });
    	});
  });

  	socket.on('turnOff', function (data) {
  		var request = new Object();
  		request.body = data;
    	fnRouter.turnOff(request,function(results){
    		//console.log(results);
      assignPin(data,'low');
    		socket.emit('stateChange', { Current: pins });
    		socket.broadcast.emit('stateChange', { Current: pins });
    	});
  });

    socket.on('saveSettings', function (data) {
      pins = data;
      writeToFile(data);
      socket.emit('stateChange', { Current: data });
      socket.broadcast.emit('stateChange', { Current: data });
    });
});
}
