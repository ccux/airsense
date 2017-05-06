var rooms = [];
var greenColorMin = 0;
var greenColorMax = 0;
var yellowColorMax = 0;
var yellowColorMin = 0;
var redColorMin = 0;
var redColorMax = 0;

var maxMonthBars = 12;
var maxWeekBars = 7;

var minNumber = 1;
var maxNumber = 100;

var greenColor = '#4fc14e';
var redColor = '#FF5454';
var yellowColor = '#FFAA54';

var procentageScaleConverter = 148/100;

var randomNumber = 0;

function getRandomNumber () {
randomNumber = Math.floor((Math.random() * procentageScaleConverter * maxNumber) + minNumber);
return randomNumber;
}

function setTemperatureGraphMonth () {

minNumber = 45;
maxNumber = 50;

for (var i = Things.length - 1; i >= 0; i--) {
	Things[i]
}

for (var i = maxMonthBars; i >= 1; i--) {

document.getElementById("Temp-Graph-Day-", i).style.height = getRandomNumber() + 'px';
/*
document.getElementById("Temp-Graph-Day-12").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-11").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-10").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-9").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-8").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-7").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-6").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-5").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-4").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-3").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-2").style.height = getRandomNumber() + 'px';
document.getElementById("Temp-Graph-Day-1").style.height = getRandomNumber() + 'px';
*/
}

function setHumidityGraphs () {

minNumber = 40;
maxNumber = 80;

greenColorMin = 41 * procentageScaleConverter;
greenColorMax = 59 * procentageScaleConverter;
yellowColorMin = 0;
yellowColorMax = 40 * procentageScaleConverter;
redColorMin = 60 * procentageScaleConverter;
redColorMax = 100 * procentageScaleConverter;

document.getElementById("Humidity-Graph-1").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-1").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-2").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-2").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-3").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-3").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-4").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-4").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-5").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-5").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-6").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-6").style.backgroundColor = setHumidityGtaphBarColor();
document.getElementById("Humidity-Graph-7").style.height = getRandomNumber() + 'px';
document.getElementById("Humidity-Graph-7").style.backgroundColor = setHumidityGtaphBarColor();
}

function setAirQualityGraphs () {

minNumber = 40;
maxNumber = 80;

greenColorMin = 0 * procentageScaleConverter;
greenColorMax = 59 * procentageScaleConverter;
yellowColorMin = 60;
yellowColorMax = 89 * procentageScaleConverter;
redColorMin = 90 * procentageScaleConverter;
redColorMax = 200 * procentageScaleConverter;

getRandomNumber()
document.getElementById("AirQuality-Graph-1").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-1").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-2").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-2").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-3").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-3").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-4").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-4").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-5").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-5").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-6").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-6").style.backgroundColor = setAirGtaphBarColor();
getRandomNumber()
document.getElementById("AirQuality-Graph-7").style.height = randomNumber + 'px';
document.getElementById("AirQuality-Graph-7").style.backgroundColor = setAirGtaphBarColor();
}


function setHumidityGtaphBarColor ()
{
if (randomNumber > redColorMin)
{
//console.log('RedColor ', randomNumber);
return redColor;
}
else if (randomNumber > yellowColorMax && randomNumber < redColorMin) {
//console.log('GreenColor ', randomNumber);
return greenColor;
}
else {
//console.log('YellowColor ', randomNumber);
return yellowColor;
}
}

function setAirGtaphBarColor ()
{
if (randomNumber > redColorMin)
{
console.log('RedColor ', randomNumber);
return redColor;
}
else if (randomNumber > greenColorMax && randomNumber < redColorMin) {
console.log('YellowColor ', randomNumber);
return yellowColor;
}
else {
console.log('GreenColor ', randomNumber);
return greenColor;
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

function getRoomsDataFromStorage () {
// Retrieve the object from storage
rooms = JSON.parse(localStorage.getItem("rooms"));
console.log('retrievedObject: ', rooms);

var roomID = getParameterByName("roomid");
console.log("Room ide is: ", roomID);

var roomName = document.getElementById("detail-title");
roomName.innerHTML = rooms[roomID].name.toUpperCase();


//Set teh room icon
var roomIcon = document.getElementsByClassName("details-header-status-image")[0];
roomIcon.src = rooms[roomID].icon;




//Set the back arrow url link so that the rooms will be loaded from memory

var backArrowLink = document.getElementById("back-arrow-link");
backArrowLink.href += "?loaded=1"; 
console.log("The new link is: ", backArrowLink.href);


var currentStatus = getRoomStatus(rooms[roomID]);
console.log("The current room status is: ", currentStatus);
//If the status is 3 or above
if (currentStatus >= 3) {
    redStatus();
}
//Else If the status is above 2
else if (currentStatus > 2) {
  yellowStatus();
}
//Else
else  {
  greenStatus();
}
}

/*WARNING !!! THE FOLLOWING 4 METHODS ARE DIRECT DUBLICATES FROM MAIN.js - THEY SHOULD BE SEPERATED INTO SEPERATE JS FUNCTIONS --- */
function getRoomStatus (room) {

    var midResult = 0;
    var hum = returnHumidityStatus(room.humidity);
    var air = returnAirQualStatus(room.airqual)
    midResult += hum + air;

    return midResult;
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

function greenStatus () {
//Green status
    document.getElementById("status-back-div").style.backgroundColor = greenColor;
   // document.getElementById("Status-Image").src = greenStatusImage;
    //document.getElementById("Status-Heading").innerHTML = "GREAT INDOOR CLIMATE";
    //document.getElementById("Status-Heading").style.color = greenColor;
    //document.getElementById("Status-Heading-Text").innerHTML = "Your home has a great overall indoor climate.";
}

function yellowStatus () {
    document.getElementById("status-back-div").style.backgroundColor = yellowColor;
   // document.getElementById("Status-Image").src = yellowStatusImage;
    //document.getElementById("Status-Heading").innerHTML = "COULD BE IMPROVED";
    //document.getElementById("Status-Heading").style.color = yellowColor;
    //document.getElementById("Status-Heading-Text").innerHTML = "Your home needs ventilation in your " + rooms[0].name + ", and in " + rooms[1].name + ".";
}

function redStatus () {
    document.getElementById("status-back-div").style.backgroundColor = redColor;
   // document.getElementById("Status-Image").src = redStatusImage;
   // document.getElementById("Status-Heading").innerHTML = "CRITICAL INDOOR CLIMATE";
   // document.getElementById("Status-Heading").style.color = redColor;
   // document.getElementById("Status-Heading-Text").innerHTML = "Your home needs ventilation in your " + rooms[0].name + ", and in " + rooms[1].name + ".";
}

setHumidityGraphs();
setTemperatureGraphMonth();
setAirQualityGraphs();
getRoomsDataFromStorage();
