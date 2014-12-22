$(window).load(function() {
/*  $.post('/read/',{pin:7}, function(value){
    alert(value);
    }); */
});

$(document).ready(function() {

//var socket = io.connect('http://app.himanshusharma.info');
var socket = io.connect('http://localhost');
//var socket = io.connect('http://10.1.1.11');
//var socket = io.connect('http://app1.himanshusharma.info');

socket.on('state', function (data) {
    //(data.Current.seven == 1 ? $('#flip-1').val('on').slider("refresh") : $('#flip-1').val('off').slider("refresh"));
    //(data.Current.eleven == 1 ? $('#flip-2').val('on').slider("refresh") : $('#flip-2').val('off').slider("refresh"));
    //(data.Current.eight == 1 ? $('#flip-3').val('on').slider("refresh") : $('#flip-3').val('off').slider("refresh"));
    //(data.Current.twelve == 1 ? $('#flip-4').val('on').slider("refresh") : $('#flip-4').val('off').slider("refresh"));
    
  });

$('#buttonPattern').on('click',function() {
    
      $.post('/blinkpattern/',{pin1:7,pin2:11,pin3:8,pin4:12}, function(){
            
            alert('Happy Diwali ;)');
            $("#flip-1").val("off").slider("refresh");
            $("#flip-2").val("off").slider("refresh");
            $("#flip-3").val("off").slider("refresh");
            $("#flip-4").val("off").slider("refresh");

        });
 
});

$('select#flip-1').change(function() {
    value = $("#flip-1").val();
    if(value== "on"){
      //  socket.emit('turnOn', { pin:7 });
    	/*$.post('/turnOn/',{pin:7}, function(){
				}); */
    }
    else {
        //socket.emit('turnOff', { pin:7 });
    	/*$.post('/turnOff/',{pin:7}, function(){
				}); */
    }

	});

$('select#flip-2').change(function() {
    value = $("#flip-2").val();
    if(value== "on"){
    	socket.emit('turnOn', { pin:11 });
        /*$.post('/turnOn/',{pin:11}, function(){
                }); */
    }
    else {
        socket.emit('turnOff', { pin:11 });
        /*$.post('/turnOff/',{pin:11}, function(){
                }); */
    }

	});

$('select#flip-3').change(function() {
    value = $("#flip-3").val();
    if(value== "on"){
        socket.emit('turnOn', { pin:8 });
        /*$.post('/turnOn/',{pin:8}, function(){
                }); */
    }
    else {
        socket.emit('turnOff', { pin:8 });
        /*$.post('/turnOff/',{pin:8}, function(){
                }); */
    }

	});

$('select#flip-4').change(function() {
    value = $("#flip-4").val();
    if(value== "on"){
        socket.emit('turnOn', { pin:12 });
        /*$.post('/turnOn/',{pin:12}, function(){
                }); */
    }
    else {
        socket.emit('turnOff', { pin:12 });
        /*$.post('/turnOff/',{pin:12}, function(){
                }); */
    }

	});
}); 