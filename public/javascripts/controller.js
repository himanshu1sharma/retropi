function roomsbean(name, switches) {
    var self = this;
    self.name = name;
    self.switches = switches;
}

function switchBean(name, pin) {
    var self = this;
    self.name = name;
    self.pin = pin;
    self.value = 'off';
}


function viewModel() {
    var self = this;
     var roomsArray = ko.observableArray();
     var switchArray = ko.observableArray();

    //var a =  '{ "data": {"roomList": [ { "name": "room1", "switches": [  { "pin": 1, "name": "fan" },{ "pin": 2, "name": "bulb" }] },{ "name": "room2", "switches": [  { "pin": 1, "name": "fan" },{ "pin": 2, "name": "bulb" }] }]}}';
    var pinState =  getState(function(roomList){

        for(var i=0; i<roomList.data.roomList.length ;i++){

        var tempSwitches = roomList.data.roomList[i].switches;
        roomList.data.roomList[i].switches = ko.observableArray();
        for (var j = 0; j< tempSwitches.length; j++) {
            roomList.data.roomList[i].switches.push(tempSwitches[j]);
        }
            roomsArray.push(new roomsbean(roomList.data.roomList[i].name, roomList.data.roomList[i].switches));
        }
        $('#homelv').listview('refresh');
    });
    
    self.rooms = roomsArray;

       // switchArray.push(new switchBean("",""));


    self.deleteRoom = function(u) {
        $.mobile.changePage("#settings", { transition: "flip", changeHash: true });

        setTimeout(function () { 
                roomsArray.remove(u);
                saveConfig(roomsArray());  
     },1000); 
    }

    self.switches = switchArray;

    self.newRoom = '';

    self.addSwitch = function(state,event) {
       switchArray.push(new switchBean("",""));
       $('#addRoomDiv').trigger('create');
    }

    self.deleteSwitch = function(value) {
        self.switches.remove(value);
    }

    self.deleteSwitchFromRoom = function(room,data) {
        for(var i=0 ; i< self.rooms().length;i++) {
            if(self.rooms()[i].name == room) {
                var index = self.rooms()[i].switches.indexOf(data);
                self.rooms()[i].switches.splice(index,1);
            }
        }
    }

    self.AddRoomSwitch = function(room) {
       for(var i=0 ; i< self.rooms().length;i++) {
            if(self.rooms()[i].name == room) {
               // self.rooms()[i].switches.push(new switchBean("",""));  
            }
        }
        $('#edit' + room).trigger('create');
        $('#' + room).trigger('create');
    }

    self.doneAddSwitches = function(value) {
        saveConfig(roomsArray());
        $.mobile.changePage("#settings", { transition: "flip", changeHash: true });
        }
    

    self.doneAddRoom = function(state,event) {

        roomsArray.push(new roomsbean(self.newRoom, self.switches));
        try {
            $('#settinglv').listview('refresh');
            $('#homelv').listview('refresh');
        } catch(e) { console.log(e);}

        $.mobile.changePage("#homePage", { transition: "flip", changeHash: true });
        saveConfig(roomsArray());
        }

    self.switchAction = function(data) {
        if ($('#button'+ data.pin).val() == 'on') {
        turnOn(data.pin);
        } else if ($('#button'+ data.pin).val() == 'off'){
        turnOff(data.pin);
        }
    }

}
/*
ko.bindingHandlers.mobileList = {
    'update': function (element, valueAccessor) {
            setTimeout(function () { //To make sure the refresh fires after the DOM is updated
                console.log("listview refresh");
                $(element).listview('refresh');
     },0);
    }
};

ko.virtualElements.allowedBindings.mobileList = true;
*/


ko.applyBindings(new viewModel());
