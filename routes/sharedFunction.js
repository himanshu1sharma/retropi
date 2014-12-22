var servo 		  = require('servoControl');


exports.turnOn = function(request){
  return function(callback){
    servo.turnOn(request,function(err,data){
      callback(err, data ? data : null);
    })
  }
}

exports.turnOff = function(request){
  return function(callback){
    servo.turnOff(request,function(err,data){
      callback(err, data ? data : null);
    })
  }
}

exports.blinkPattern = function(request){
  return function(callback){
    servo.blinkPattern(request,function(err,data){
      callback(err, data ? data : null);
    })
  }
}

exports.blink = function(request){
  return function(callback){
    servo.blink(request,function(err,data){
      callback(err, data ? data : null);
    })
  }
}

exports.readState = function(request){
  return function(callback){
    servo.readState(request,function(err,data){
      callback(err, data ? data : null);
    })
  }
}

