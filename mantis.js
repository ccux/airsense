/* AIRSENSE V.0.1  - FRONT PAGE*/

//Set the loading indicator
  var loading = document.getElementById("loading");
  console.log("Div is: ", loading);
  loading.style.display = "flex";

//Remove the facts section
$('#fact-section').hide();


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

var roomIcons = [
                "https://raw.githubusercontent.com/ccux/airsense/master/Living%20room%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Kitchen%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Bedroom%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Children%20Room%402x.png",
                "https://raw.githubusercontent.com/ccux/airsense/master/Office%402x.png"];


//var status = 0;

//var sensorData = 0;
/* ################################# STATUS CALCULATIONS - START ############################## */

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

function getRoomStatus (room) {

    var midResult = 0;
    var hum = returnHumidityStatus(room.humidity);
    var air = returnAirQualStatus(room.airqual)
    midResult = hum + air;

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

function returnHumidityLabelClass (value) {

var greenColorMin = 41;
var greenColorMax = 59;
var yellowColorMin = 0;
var yellowColorMax = 40;
var redColorMin = 60;
var redColorMax = 100;

if (value > redColorMin)
{
//console.log('RedColor ', value);
return '';
}
else if (value > yellowColorMax && value < redColorMin) {
//console.log('GreenColor ', value);
return ' humidity-status-green';
}
else {
//console.log('YellowColor ', value);
return ' humidity-status-yellow';
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

/* ################################# STATUS CALCULATIONS - END ############################## */

/*
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
*/



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
var roomBlockHTML;
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
roomBlockHTML = '<div class="room-block';

if (i === 0) {
roomBlockHTML += ' room-block-end';
console.log("Added the block padding");
}

var temperature = 'N/A';
var humidity = 'N/A';
for (var p = 0; p < sensorData.sensors[i].latest_data.data.length; p++) {
  if (sensorData.sensors[i].latest_data.data[p].name === 'temperature') {
    temperature = Math.round(sensorData.sensors[i].latest_data.data[p].value);
  }
  else if (sensorData.sensors[i].latest_data.data[p].name === 'relative humidity') {
     humidity = Math.round(sensorData.sensors[i].latest_data.data[p].value);
  }
}

var humidityClass = returnHumidityLabelClass(humidity);


//var humidity = Math.round(sensorData.sensors[i].latest_data.data.)
//var airQuality =

roomBlockHTML += '"><a class="room-detail-link w-inline-block" ';
roomBlockHTML += 'href="http://mantis-e9c0de.webflow.io/detail?roomid=';
roomBlockHTML += sensorData.sensors[i].id; // Sensor ID count number
roomBlockHTML += '&sensorid=' + sensorData.sensors[i].mac_address; // Room sensor MAC adress
roomBlockHTML += '&title=' + encodeURIComponent(sensorData.sensors[i].location); //Set the Room Title
roomBlockHTML += '&temperature=' + temperature; // Room temperature to link
roomBlockHTML += '&humidity=' + humidity; // Room temperature to link
roomBlockHTML += '" id="Room-' + sensorData.sensors[i].id + '-Block"></a><div class="room-block-content"><h4 class="room-block-title" id="demo-title">';
roomBlockHTML += sensorData.sensors[i].location.toUpperCase(); //Set temperature  Title Label
roomBlockHTML += '</h4><img class="room-block-icon" height="50" src=';
roomBlockHTML += '"http://uploads.webflow.com/58dab8fd2bebde920b1f3557/58db8014b2a7d646468737e8_Room_Square_Block_Icon.png"';
roomBlockHTML += ' width="50"><h1 class="room-block-temperature temperature-number">';
roomBlockHTML += temperature;
roomBlockHTML += '</h1><h1 class="degree-symbol room-block-temperature">∘</h1><div class="room-block-humitity-row w-row"><div class="column-3 w-col w-col-6"><div class="room-block-data-title">Humidity</div></div><div class="column-4 w-col w-col-6"><h4 '
roomBlockHTML += 'class="room-block-humidity'//Humidity class
roomBlockHTML += '' + humidityClass + '">'; //Humidity class - Extra
roomBlockHTML += humidity; //Set humidity value
roomBlockHTML += '%'; //Humidity unit
roomBlockHTML += '</h4></div></div><div class="room-block-air-quality-row room-block-humitity-row w-row"><div class="column-3 w-col w-col-6"><div class="airquality room-block-data-title">Air Quality</div></div><div class="column-4 w-col w-col-6"><img class="room-block-airquality-status-image" height="21" src="'
roomBlockHTML += 'http://uploads.webflow.com/58dab8fd2bebde920b1f3557/58db7da10b307284023739b1_1-full.svg'; //Airquality image
roomBlockHTML += '" width="21"></div></div></div></div>';

$("#room--container").append(roomBlockHTML);

console.log("Added the HTML Block");


// CSS - humidity-status-green (GREEN) humidity-status (RED)  humidity-status-yellow (YELLOW)





//var roomBlockDiv = document.getElementsByClassName('room-container').innerHTML = roomBlockHTML;


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

var roomBlockEndSpacingkHTML = '<div class="room-block-spacing"></div>';

$("#room--container").append(roomBlockEndSpacingkHTML);
console.log("Added the end HTML Block spacing");

//Set the links of the rooms to pass the romms to the Detail view
/*var roomDetailLinks = document.getElementsByClassName("room-detail-link");

console.log("TEEEEST ", roomDetailLinks);

for (var i = 0; sensorData.sensors.length > i; i++) {
    roomDetailLinks[i].href += "?roomid=" + i; 

     console.log("The new link is: ", roomDetailLinks[i].href);
}*/
//Remove the loading animation
var loadingDiv = document.getElementById("loading");
  console.log("Div is: ", loadingDiv);
  loadingDiv.style.display = "none"
  //$(".loading").fadeOut();
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
  
  

//Save the RoomData locally
// Put the object into storage
localStorage.setItem('rooms', JSON.stringify(rooms));
  
});
*/


// ################################ RUN PROGRAM ##################################################
$('document').ready(function(){
  
    $.ajax({
   url: 'http://172.104.145.165/webservice/apartments/1',
   data: {
      format: 'json'
   },
   error: function() {
      alert("Der er sket en fejl. Prøv venligst igen om lidt. Fortsætter fejlen så kontakt Xtel Wireless");
   },
   dataType: 'json',
   success: function(data) {
    console.log("JSON apartment data revieced!");
    console.log(data.sensors[0].latest_data.value);
    sensorData = data;
    logSensorData();

    //Setup websocket listner
    if(!("WebSocket" in window)){
     alert("Din browser er ikke understøttet. Anvend Safari eller Chrome");
    }
    else {
      webSocket();
    }

   },
   type: 'GET'
});





}); //document ready end


function webSocket () {

      //The user has WebSockets
          var socket;
          var host = "ws://172.104.145.165/ws/1?subscribe-broadcast";

          try{
              var socket = new WebSocket(host);

              console.log('Socket Status: '+socket.readyState);

              socket.onopen = function(){
               console.log('Socket Status: '+socket.readyState+' (open)');
              }

              socket.onmessage = function(msg){
               console.log('Received: '+msg.data);
               updateWithData (msg.data);
              }

              socket.onclose = function(){
                console.log('Socket Status: '+socket.readyState+' (Closed)');
              }     

          } catch(exception){
             console.log('Error '+exception);
          }
}

function updateWithData (data) {

for (var i = 0; i < data.length; i++) {
  var foundIt = $('.room-detail-link').find(`[sensorid='${data[data.length-1].mac_address}']`);
  console.log(foundIt);
}

}

window.onbeforeunload = function() {
    websocket.onclose = function () {}; // disable onclose handler first
    websocket.close()
    console.log("Websocket closed on page exit!");
};

