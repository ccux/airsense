/*
//Set the loading indicator
  var loading = document.getElementById("loading");
  console.log("Div is: ", loading);
  loading.style.display = "flex";

var greenColor = '#4fc14e';
var redColor = '#FF5454';
var yellowColor = '#FFAA54';
var blueColor = '#3498DB';

var redStatusImage = "https://rawgithub.com/ccux/airsense/master/Status-1.svg";
var yellowStatusImage = "https://rawgithub.com/ccux/airsense/master/Status-2.svg";
var blueStatusImage = "https://rawgithub.com/ccux/airsense/master/Status-3.svg";
var greenStatusImage = "https://rawgithub.com/ccux/airsense/master/Status-4.svg";

var redIndicator = "https://rawgithub.com/ccux/airsense/master/status-red.svg";
var yellowIndicator = "https://rawgithub.com/ccux/airsense/master/status-yellow.svg";
var blueIndicator = "https://rawgithub.com/ccux/airsense/master/status-blue.svg";
var greenIndicator = "https://rawgithub.com/ccux/airsense/master/status-green.svg";

var airQualityIndicatorGreen = "https://rawgithub.com/ccux/airsense/master/images/air-indicator-green.svg";
var airQualityIndicatorYellow = "https://rawgithub.com/ccux/airsense/master/images/air-indicator-yellow.svg";
var airQualityIndicatorRed = "https://rawgithub.com/ccux/airsense/master/images/air-indicator-red.svg";

var status = 0;

var sensorData = 0;

var numberOfRooms = 5;
var rooms = [];

var roomNames = ["Living Room",
                "Kitchen",
                "Bedroom",
                "Kids Room",
                "Room"];

var roomIcons = [
                "https://raw.githubusercontent.com/ccux/airsense/master/Living%20room%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Kitchen%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Bedroom%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Children%20Room%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Office%402x.png"];


function greenStatus () {
//Green status
    document.getElementById("Status-Back-Div").style.backgroundColor = greenColor;
    document.getElementById("Status-Image").src = greenStatusImage;
    document.getElementById("Status-Heading").innerHTML = "GREAT INDOOR CLIMATE";
    document.getElementById("Status-Heading").style.color = greenColor;
    document.getElementById("Status-Heading-Text").innerHTML = "Your home has a great overall indoor climate.";
}

function blueStatus () {
    document.getElementById("Status-Back-Div").style.backgroundColor = blueColor;
    document.getElementById("Status-Image").src = blueStatusImage;
    document.getElementById("Status-Heading").innerHTML = "HEALTHY INDOOR CLIMATE";
    document.getElementById("Status-Heading").style.color = blueColor;
    document.getElementById("Status-Heading-Text").innerHTML = "Your home could need ventilation in " + rooms[0].name + ", but otherwise there is a good overall indoor climate.";
}

function yellowStatus () {
    document.getElementById("Status-Back-Div").style.backgroundColor = yellowColor;
    document.getElementById("Status-Image").src = yellowStatusImage;
    document.getElementById("Status-Heading").innerHTML = "COULD BE IMPROVED";
    document.getElementById("Status-Heading").style.color = yellowColor;
    document.getElementById("Status-Heading-Text").innerHTML = "Your home needs ventilation in your " + rooms[0].name + ", and in " + rooms[1].name + ".";
}

function redStatus () {
    document.getElementById("Status-Back-Div").style.backgroundColor = redColor;
    document.getElementById("Status-Image").src = redStatusImage;
    document.getElementById("Status-Heading").innerHTML = "CRITICAL INDOOR CLIMATE";
    document.getElementById("Status-Heading").style.color = redColor;
    document.getElementById("Status-Heading-Text").innerHTML = "Your home needs ventilation in your " + rooms[0].name + ", and in " + rooms[1].name + ".";
}

//Create a new Room object
function Room() {
    this.name = "";
    this.sensorID = "";
    this.icon = "";
    this.temp = "";
    this.humidity = "";
    this.airqual = "";
    this.sensorDetected = false;
    //Create Room
    //var room = new Room;
}

//Create a random number between 2 parameter values
function randomize (min, max) {
    var result = (Math.floor((Math.random() * (max-min+1) + min)));
    return result;
}

//Create a random temperature between 2 values
function randomizeTemperature () {
    var min = 18;
    var max = 26;
    return (randomize(min, max));
}

//Create a random humidity between 2 values
function randomizeHumidity () {
    var min = 30;
    var max = 80;
    return (randomize(min, max));
}

//Create a random AirQuality between 2 values
function randomizeAirQual () {
    var min = 400;
    var max = 1600;
    return (randomize(min, max));
}

//Create a random Sensor ID
function sensorID()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 12; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//Create the rooms and add the to the rooms array
function createRooms () {
for (var i = 0; i < numberOfRooms; i++) {
var myRoom = new Room;

if (i <= 3) {
    myRoom.icon = roomIcons[i];
    myRoom.name = roomNames[i];
        
}
else {
    myRoom.icon = roomIcons[4];
    myRoom.name = "" + roomNames[4] + " " + (i - 3);
}

    myRoom.sensorID = sensorID();
    myRoom.temp = randomizeTemperature();
    myRoom.humidity = randomizeHumidity();
  
  ///EMO
  if (returnHumidityStatus(myRoom.humidity) > 2)
  {
  myRoom.humidity = randomizeHumidity();
  }
  
    myRoom.airqual = randomizeAirQual();
  
  //DEMO
  if (returnAirQualStatus(myRoom.airqual) > 2)
  {
  myRoom.airqual = randomizeAirQual();
  }
  
    myRoom.sensorDetected = true;

//Add the room to the rooms array
rooms.push(myRoom);
//console.log(rooms);
}
//Sort room array based on 
rooms.sort(function(a, b){return getRoomStatus(b)-getRoomStatus(a)});

//Print array
console.log("1 " + getRoomStatus(rooms[0]));
console.log("2 " + getRoomStatus(rooms[1]));
console.log("3 " + getRoomStatus(rooms[2]));
console.log("4 " + getRoomStatus(rooms[3]));
console.log("5 " + getRoomStatus(rooms[4]));
}


function getRoomStatus (room) {

    var midResult = 0;
    var hum = returnHumidityStatus(room.humidity);
    var air = returnAirQualStatus(room.airqual)
    midResult += hum + air;

    return midResult;
}

function calculateOverallStatus () {
//First calculate the individual status of each room based on the three factors
status = 0;

console.log("Status 0: " + status);

var midResult = 0;

for (var i = rooms.length - 1; i >= 0; i--) {

var hum = returnHumidityStatus(rooms[i].humidity);
var air = returnAirQualStatus(rooms[i].airqual)

console.log("Hum status: " + hum);
console.log("Air status: " + air);

midResult += hum + air;

console.log("Status " + i + " " + midResult);
}

status += midResult;

console.log("Status pre /: " + status);

status /= (rooms.length);

console.log("Total status: " + status);

var color = "";

//If the status is 3 or above
if (status >= 3) {
    redStatus();
}
//Else If the status is above 2
else if (status > 2) {
  yellowStatus();

}
//Else If the status is above 1.5
else if (status >= 1.5) {
  blueStatus();

}
//Else If the status is lass or equal to 1.5
else if (status < 1.5) {
    greenStatus();
}
}

function returnHumidityStatus (value) {

var greenColorMin = 41;
var greenColorMax = 59;
var yellowColorMin = 0;
var yellowColorMax = 40;
var redColorMin = 60;
var redColorMax = 100;

if (value > redColorMin)
{
//console.log('RedColor ', value);
return 3;
}
else if (value > yellowColorMax && value < redColorMin) {
//console.log('GreenColor ', value);
return 0;
}
else {
//console.log('YellowColor ', value);
return 2;
}

}

function returnAirQualStatus (value) {

var greenColorMin = 0;
var greenColorMax = 999;
var yellowColorMin = 1000;
var yellowColorMax = 1299;
var redColorMin = 1300;
var redColorMax = 1600;
    
if (value > redColorMin)
{
//console.log('RedColor ', value);
return 3;
}
else if (value > greenColorMax && value < redColorMin) {
//console.log('YellowColor ', value);
return 2;
}
else {
//console.log('GreenColor ', value);
return 0;
}
}

function humidityColor (value) {
var colorStatus = returnHumidityStatus(value);

console.log('The Color Value is: ' + value + " - And the Color Status is " + colorStatus);

if (colorStatus >= 3)
{
//console.log('RedColor ', value);
return redColor;
}
else if (colorStatus === 0) {
//console.log('GreenColor ', value);
return greenColor;
}
else if (colorStatus === 2){
//console.log('YellowColor ', value);
return yellowColor;
}
else {
return greenColor;
}
}

function airQualColor (value) {
var colorStatus = returnAirQualStatus(value);
if (colorStatus >= 3)
{
//console.log('RedColor ', value);
return redColor;
}
else if (colorStatus === 0) {
//console.log('GreenColor ', value);
return greenColor;
}
else if (colorStatus === 2){
//console.log('YellowColor ', value);
return yellowColor;
}
else {
return greenColor;
}
}

function returnAirQualStatusImage (value) {
    if (value === redColor) {
        return airQualityIndicatorRed;
    }
    else if (value === yellowColor) {
        return airQualityIndicatorYellow;
    }
    else {
        return airQualityIndicatorGreen;
    }
}


function setRoomDetailsOnDom () {

//Loop trough the rooms and set the corresponding values
for (var i = rooms.length - 1; i >= 0; i--) {

//Set the name
var roomTitle = document.getElementsByClassName('room-block-title')[i];
//console.log(roomTitle);
roomTitle.innerHTML = rooms[i].name.toUpperCase();

//Set the temperature
var temperature = document.getElementsByClassName('temperature-number')[i];
temperature.innerHTML = rooms[i].temp;

//Set Humidity color
var humidity = document.getElementsByClassName('room-block-humidity')[i];
humidity.innerHTML = rooms[i].humidity + "%";
var statusColor = humidityColor(rooms[i].humidity);
humidity.style.color = statusColor;
console.log("Color is: ", statusColor);
//console.log("TEST " + document.getElementsByClassName('room-block-humidity')[0]);

var roomIcon = document.getElementsByClassName('room-block-icon')[i];
roomIcon.src = rooms[i].icon;

var airQualIcon = document.getElementsByClassName('room-block-airquality-status-image')[i];
var airQualIconSrc = returnAirQualStatusImage(airQualColor(rooms[i].airqual))
airQualIcon.src = airQualIconSrc;
}

//Set the links of the rooms to pass the romms to the Detail view
var roomDetailLinks = document.getElementsByClassName("room-detail-link");

console.log("TEEEEST ", roomDetailLinks);

for (var i = 0; rooms.length > i; i++) {
    roomDetailLinks[i].href += "?roomid=" + i; 

     console.log("The new link is: ", roomDetailLinks[i].href);
}
}




//Link parsing function
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*NEW DATA METHODS */

function setRealRoomDetailsOnDom () {

//Enpty the rooms HTML
$("#room--container").empty();

//Loop trough the rooms and set the corresponding values
for (var i = sensorData.sensors.length - 1; i >= 0; i--) {

//Set the name
//var roomTitle = document.getElementsByClassName('room-block-title')[i];
//console.log(roomTitle);
//roomTitle.innerHTML = sensorData.sensors[i].location.toUpperCase();//rooms[i].name.toUpperCase();

//Set the temperature
//var temperature = document.getElementsByClassName('temperature-number')[i];
//temperature.innerHTML = Math.round(sensorData.sensors[i].latest_data.value);//rooms[i].temp;


//HTML ROOM BLOCK
var roomBlockHTML = '<div class="room-block';

if (i === sensorData.sensors.length) {
roomBlockHTML += ' room-block-end';
}

roomBlockHTML += '"><a class="room-detail-link w-inline-block" ';
roomBlockHTML += 'href="http://mantis-e9c0de.webflow.io/detail?roomid=';
roomBlockHTML += i;
roomBlockHTML += '" id="Room-1-Block"></a><div class="room-block-content"><h4 class="room-block-title" id="demo-title">';
roomBlockHTML += sensorData.sensors[i].location.toUpperCase();
roomBlockHTML += '</h4><img class="room-block-icon" height="50" src=';
roomBlockHTML += '"http://uploads.webflow.com/58dab8fd2bebde920b1f3557/58db8014b2a7d646468737e8_Room_Square_Block_Icon.png"';
roomBlockHTML += ' width="50"><h1 class="room-block-temperature temperature-number">';
roomBlockHTML += Math.round(sensorData.sensors[i].latest_data.value);
roomBlockHTML += '</h1><h1 class="degree-symbol room-block-temperature">∘</h1><div class="room-block-humitity-row w-row"><div class="column-3 w-col w-col-6"><div class="room-block-data-title">Humidity</div></div><div class="column-4 w-col w-col-6"><h4 class="room-block-humidity">';
roomBlockHTML += '64';
roomBlockHTML += '%</h4></div></div><div class="room-block-air-quality-row room-block-humitity-row w-row"><div class="column-3 w-col w-col-6"><div class="airquality room-block-data-title">Air Quality</div></div><div class="column-4 w-col w-col-6"><img class="room-block-airquality-status-image" height="21" src="http://uploads.webflow.com/58dab8fd2bebde920b1f3557/58db7da10b307284023739b1_1-full.svg" width="21"></div></div></div></div>';

if (i === sensorData.sensors.length) {
roomBlockHTML += '<div class="room-block-spacing"></div>';
}

//var roomBlockDiv = document.getElementsByClassName('room-container').innerHTML = roomBlockHTML;
var roomBlockDiv = $("#room--container").append(roomBlockHTML);
console.log("Added the new HTML Block");

//Set Humidity color
/*var humidity = document.getElementsByClassName('room-block-humidity')[i];
humidity.innerHTML = rooms[i].humidity + "%";
var statusColor = humidityColor(rooms[i].humidity);
humidity.style.color = statusColor;
console.log("Color is: ", statusColor);
*/
//console.log("TEST " + document.getElementsByClassName('room-block-humidity')[0]);

/*var roomIcon = document.getElementsByClassName('room-block-icon')[i];
roomIcon.src = rooms[i].icon;*/

/*var airQualIcon = document.getElementsByClassName('room-block-airquality-status-image')[i];
var airQualIconSrc = returnAirQualStatusImage(airQualColor(rooms[i].airqual))
airQualIcon.src = airQualIconSrc;*/
}

//Set the links of the rooms to pass the romms to the Detail view
/*var roomDetailLinks = document.getElementsByClassName("room-detail-link");

console.log("TEEEEST ", roomDetailLinks);

for (var i = 0; sensorData.sensors.length > i; i++) {
    roomDetailLinks[i].href += "?roomid=" + i; 

     console.log("The new link is: ", roomDetailLinks[i].href);
}*/
}

function logSensorData () {
console.log(sensorData.sensors[0].latest_data.value);
console.log(sensorData.sensors.length);
setRealRoomDetailsOnDom();
}

// ################################ RUN PROGRAM ##################################################

/*
var hasLoaded = getParameterByName("loaded");

if (hasLoaded != null) {

console.log("The status is already here", getParameterByName("loaded"));

rooms = JSON.parse(localStorage.getItem("rooms"));

}
else {
console.log("The main status has not been loaded");

createRooms();

}



calculateOverallStatus();
setRoomDetailsOnDom();

$(window).load(function() {
  
  var loadingDiv = document.getElementById("loading");
  console.log("Div is: ", loadingDiv);
  loadingDiv.style.display = "none"
  //$(".loading").fadeOut();

//Save the RoomData locally
// Put the object into storage
localStorage.setItem('rooms', JSON.stringify(rooms));
  
});
*/

$('document').ready(function(){
  
  /*
    //Set the real values on the DOM
    $.ajax({
    url: 'http://172.104.145.165/webservice/apartments/1',
    type: 'GET',
    callba
    success: dataRecieved(data)
    });

    function dataRecieved (myData) {
    console.log("We got the data!");
    console.log(myData.sensors[0].latest_data.value);
    } 
*/

    $.ajax({
   url: 'http://172.104.145.165/webservice/apartments/1',
   data: {
      format: 'json'
   },
   error: function() {
      alert("Json error");
   },
   dataType: 'json',
   success: function(data) {
    console.log("We got the data!");
    console.log(data.sensors[0].latest_data.value);
    sensorData = data;
    logSensorData();
   },
   type: 'GET'
});

}); //document ready end


