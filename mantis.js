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

var status = 0;

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
  
  /*DEMO*/
  if (returnHumidityStatus(myRoom.humidity) > 2)
  {
  myRoom.humidity = randomizeHumidity();
  }
  
    myRoom.airqual = randomizeAirQual();
  
  /*DEMO*/
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

status /= (rooms.length/* * 2*/);

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
        return redIndicator;
    }
    else if (value === yellowColor) {
        return yellowIndicator;
    }
    else {
        return greenIndicator;
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
}

// ################################ RUN PROGRAM ##################################################
createRooms();
calculateOverallStatus();

$('document').ready(function(){
         // your code
  console.log("The Dom has loaded");
    setRoomDetailsOnDom();
   });

//Save the RoomData locally
// Put the object into storage
localStorage.setItem('rooms', JSON.stringify(rooms));

//Set the links of the rooms to pass the romms to the Detail view
var roomDetailLinks = document.getElementsByClassName("room-detail-link");
for (var i = 0; rooms.length >=  i +1; i++) {
    roomDetailLinks[i].href += "?roomid=" + i; 

     console.log("The new link is: ", roomDetailLinks[i].href);
}




