//Set the loading indicator
  var loading = document.getElementById("loading");
  //console.log("Div is: ", loadingDiv);
  loading.style.display = "flex"

$('.history-section').eq(0).hide();
$('.history-section').eq(1).hide();
$('.history-section').eq(2).hide();


/*
function scrollFunction() {
    var scrollPos = document.body.scrollTop;

	//console.log("Scrolling");
	
    if (scrollPos < 0) {
       // document.getElementsByClassName("nav-bar")[0].style.position = "fixed";
       // document.getElementsByClassName("nav-bar")[0].style.top = "0px";
	//document.getElementsByClassName("nav-bar")[0].style.top = scrollPos;
    } else {
       // document.getElementsByClassName("nav-bar")[0].style.position = "relative";
    }
}

window.onscroll = scrollFunction;

var rooms = [];
var greenColorMin = 0;
var greenColorMax = 0;
var yellowColorMax = 0;
var yellowColorMin = 0;
var redColorMin = 0;
var redColorMax = 0;

var maxDayBars = 12;
var maxWeekBars = 7;

//var minNumber = 1;
//var maxNumber = 100;

var greenColor = '#4fc14e';
var redColor = '#FF5454';
var yellowColor = '#FFAA54';

var procentageScaleConverter = 148/100;

//var randomNumber = 0;

var roomID = "";

//Clear the room description text
document.getElementById("detail-status-description").innerHTML = "";

//Random number
function getRandomNumber (minNumber, maxNumber) {
var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber+1) + minNumber);
return randomNumber;
}

function setTemperatureGraphMonth () {

var minNumber = 18;
var maxNumber = 26;
var tempScale = 145/30;
	
for (var i = maxDayBars; i >= 1; i--) {

var myID = "Temp-Graph-Day-" + i;

if (i === 1) {
//100% is 30 degrees (145px) 1 

var myTemperature = rooms[roomID].temp * tempScale; //Does not show up 100% accuratly
console.log("Temperature now is : ", rooms[roomID].temp);
document.getElementById(myID).style.height = myTemperature + 'px';
}
else {
var temperatureGraphValue = getRandomNumber(minNumber, maxNumber) * tempScale;
document.getElementById(myID).style.height = temperatureGraphValue + 'px';
}
}
}

function setHumidityGraphs () {

var minNumber = 35;
var maxNumber = 70;

greenColorMin = 41 * procentageScaleConverter;
greenColorMax = 59 * procentageScaleConverter;
yellowColorMin = 0 * procentageScaleConverter;
yellowColorMax = 40 * procentageScaleConverter;
redColorMin = 60 * procentageScaleConverter;
redColorMax = 100 * procentageScaleConverter;

	
var roomConvertedHumidity = rooms[roomID].humidity  * procentageScaleConverter;
//Set the humidity status text
if (roomConvertedHumidity > redColorMin) {
setStatusAndImprovementDescription("red");
//console.log("Status - Red color");
}
else if (roomConvertedHumidity > yellowColorMax && roomConvertedHumidity < redColorMin) {
setStatusAndImprovementDescription("green"); 
//console.log("Status - green color");
}
else {
setStatusAndImprovementDescription("yellow"); 
//console.log("Status - Yellow color");
}
	
//console.log("Status" + rooms[roomID].humidity);
	
//Set the graph bars
for (var i = maxWeekBars; i >= 1; i--) {

var myID = "Humidity-Graph-" + i;

//onsole.log(myID);

if (i === 1) {
var myHumidity = rooms[roomID].humidity * procentageScaleConverter; //Does not show up 100% accuratly
document.getElementById(myID).style.height = myHumidity + 'px';
document.getElementById(myID).style.backgroundColor = setHumidityGtaphBarColor(myHumidity);
	
}
else {
var randomHumidity = getRandomNumber(minNumber, maxNumber);// * procentageScaleConverter;
randomHumidity = randomHumidity * procentageScaleConverter;
console.log("My random humidity is: ", randomHumidity);
document.getElementById(myID).style.height = randomHumidity + 'px';
console.log("My random graph hight is : ", document.getElementById(myID).style.height);
document.getElementById(myID).style.backgroundColor = setHumidityGtaphBarColor(randomHumidity);
console.log("My random color is : ", document.getElementById(myID).style.backgroundColor);
}
}
	

}

//Setup the detail text
//Status ID: detail-status-description
//Solution ID: detail-status-solution
function setStatusAndImprovementDescription (status) {
//Humidity
var humidityDescriptionText = "";
//console.log("The status is: ", status);

// Red status
if (status === "red") {
humidityDescriptionText = "This room has a very high humidity of " + rooms[roomID].humidity + "%. This can cause mould and fongus if the temperature gets too low. Make sure that you ventilate the room to bring the humidity down.";
}
// Yellow status
else if (status === "yellow") {
humidityDescriptionText = "This room has a low humidity level of " + rooms[roomID].humidity + "%. This can cause irritation for the loungs and allergies.";
}
// Green Status
else if (status === "green") {
humidityDescriptionText = "This room has a great humidity level of " + rooms[roomID].humidity + "%. Keep up the good work!";
}
//Set the text description on the DOM
document.getElementById("detail-status-description").innerHTML += humidityDescriptionText;
}

//Setup the detail text - Air
//Status ID: detail-status-description
//Solution ID: detail-status-solution
function setStatusAndImprovementDescriptionAir (status) {
//Humidity
var airQualyDescriptionText = "";
//console.log("The status is: ", status);

// Red status
if (status === "red") {
airQualyDescriptionText = "\nThe room has a very high CO2 level at " + rooms[roomID].airqual + "PPM. Research shows that levels above 1000 PPM has an effect on the mental performance of people that are in the rooms.";
}
// Yellow status
else if (status === "yellow") {
airQualyDescriptionText = "This room has medium/high level of CO2 at " + rooms[roomID].airqual + "PPM. Try not to exceed this level for longer periods of time.";
}
// Green Status
else if (status === "green") {
airQualyDescriptionText = "This room has a great CO2 level at " + rooms[roomID].airqual + "%. Keep up the good work!";
}
//Set the text description on the DOM
document.getElementById("detail-status-description").innerHTML += airQualyDescriptionText;
}



function setAirQualityGraphs () {

var realScale = 1600/145;	
	
var minNumber = 30;
var maxNumber = 90;

greenColorMin = 0 * procentageScaleConverter;
greenColorMax = 59 * procentageScaleConverter;
yellowColorMin = 60 * procentageScaleConverter;
yellowColorMax = 89 * procentageScaleConverter;
redColorMin = 90 * procentageScaleConverter;
redColorMax = 200 * procentageScaleConverter;
	
	
var roomConvertedAirQual = rooms[roomID].airqual  * procentageScaleConverter;
//Set the humidity status text
if (roomConvertedAirQual > redColorMin) {
setStatusAndImprovementDescriptionAir("red");
//console.log("Status - Red color");
}
else if (roomConvertedAirQual > yellowColorMax && roomConvertedAirQual < redColorMin) {
setStatusAndImprovementDescriptionAir("green"); 
//console.log("Status - green color");
}
else {
setStatusAndImprovementDescriptionAir("yellow"); 
//console.log("Status - Yellow color");
}	
	
//Set the graph bars
for (var i = maxWeekBars; i >= 1; i--) {

var myID = "AirQuality-Graph-" + i;

//onsole.log(myID);

if (i === 1) {
//var myAirQual = rooms[roomID].airqual * procentageScaleConverter; //Does not show up 100% accuratly
var myAirQual = getRandomNumber(minNumber, maxNumber);
myAirQual = myAirQual * procentageScaleConverter;
document.getElementById(myID).style.height = myAirQual + 'px';
document.getElementById(myID).style.backgroundColor = setAirGtaphBarColor(myAirQual);	
console.log("This is my airquality graph height", myAirQual, rooms[roomID].airqual);
}
	
else {
var randomAirQual = getRandomNumber(minNumber, maxNumber);// * procentageScaleConverter;
randomAirQual = randomAirQual * procentageScaleConverter;
console.log("My random air qual is: ", randomAirQual);
document.getElementById(myID).style.height = randomAirQual + 'px';
console.log("My random graph hight is : ", document.getElementById(myID).style.height);
document.getElementById(myID).style.backgroundColor = setAirGtaphBarColor(randomAirQual);
console.log("My random color hight is : ", document.getElementById(myID).style.backgroundColor);
}
}
}


function setHumidityGtaphBarColor (value)
{

if (!value) {
console.log("Error - The random number is not here!");
return;
}

if (value > redColorMin)
{
//console.log('RedColor ', randomNumber);
return redColor;
}
else if (value > yellowColorMax && value < redColorMin) {
//console.log('GreenColor ', randomNumber);
return greenColor;
}
else {
//console.log('YellowColor ', randomNumber);
return yellowColor;
}
}

function setAirGtaphBarColor (value)
{
	
if (!value) {	
console.log("Error - The random number is not here!");
return;
}
	
if (value > redColorMin)
{
//console.log('RedColor ', randomNumber);
return redColor;
}
else if (value > greenColorMax && value < redColorMin) {
//console.log('YellowColor ', randomNumber);
return yellowColor;
}
else {
//console.log('GreenColor ', randomNumber);
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
//console.log('retrievedObject: ', rooms);

roomID = getParameterByName("roomid");
//console.log("Room ide is: ", roomID);
	
//Redirect if no room is selected	
if (roomID === null) {
// similar behavior as an HTTP redirect
window.location.replace("http://mantis-e9c0de.webflow.io/");	
}	
	
var roomName = document.getElementById("detail-title");
roomName.innerHTML = rooms[roomID].name.toUpperCase();


//Set the room icon
var roomIcon = document.getElementsByClassName("details-header-status-image")[0];
roomIcon.src = rooms[roomID].icon;




//Set the back arrow url link so that the rooms will be loaded from memory

var backArrowLink = document.getElementById("back-arrow-link");
backArrowLink.href += "?loaded=1"; 
//console.log("The new link is: ", backArrowLink.href);


var currentStatus = getRoomStatus(rooms[roomID]);
//console.log("The current room status is: ", currentStatus);
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


*/


/*WARNING !!! THE FOLLOWING 4 METHODS ARE DIRECT DUBLICATES FROM MAIN.js - THEY SHOULD BE SEPERATED INTO SEPERATE JS FUNCTIONS --- */
/*
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
*/


/*THE OLD APPLICATION*/
//getRoomsDataFromStorage();
//setHumidityGraphs();
//setTemperatureGraphMonth();
//setAirQualityGraphs();

/*
function buildGraphWithData (duration, dataSetArray, onObject) {
//Experiment with graph
//Graph-Week-Colum-Bar-Container - (is where the garp bars are)

//HTML for day graph
//var graph = document.getElementsByClassName("graph-week-colum-bar-container")[0];
var buildResult = '';	
	
for (var i = 0; i < duration; i++) {
var height = dataSetArray[i];
var timeStamp = "" + i;
buildResult += '<div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-9" style="height: ' + height + ';"></div></div><div class="w-col w-col-2"><div class="text-block-3">' + timeStamp + '</div></div></div>'; 
}
	
onObject.innerHTML = buildResult;
	//graph.innerHTML = '<div class="graph-week-colum-bar-container w-col w-col-10"><div class="div-block-2"><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-12" style="height: 116px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">18</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10">';
	//'<div class="graph-week-colum-bar-container w-col w-col-10"><div class="div-block-2"><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-12" style="height: 116px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">18</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-11" style="height: 125.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">20</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-10" style="height: 125.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">22</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-9" style="height: 125.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">00</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-8" style="height: 96.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">02</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-7" style="height: 87px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">04</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-6" style="height: 111.16666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">06</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-5" style="height: 87px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">08</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-4" style="height: 96.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">10</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-3" style="height: 116px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">12</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-2" style="height: 125.66666666666666px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">14</div></div></div><div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-1" style="height: 91.83333333333333px;"></div></div><div class="w-col w-col-2"><div class="text-block-3">Now</div></div></div></div></div>';

//$("#box").animate({height: "300px"});
	
}

document.getElementsByClassName("history-graph-view-selector")[0].addEventListener("click", function(){
    
buildGraphWithData(12,["120px", "110px", "100px", "90px", "80px", "70px", "60px", "50px", "40px", "20px", "10px" ,"0px"], document.getElementsByClassName("graph-week-colum-bar-container")[0]);

});
*/
$(window).load(function() {
 
  var loadingDiv = document.getElementById("loading");
  console.log("Removing loading div: ", loadingDiv);
  loadingDiv.style.display = "none"
 // $("#loading").fadeOut();

});

$('document').ready(function(){
  
  //Get Temperature 24hours JSON data
    $.ajax({
   url: 'http://172.104.145.165/webservice/apartments/1/sensors/1/history?period=day',
   data: {
      format: 'json'
   },
   error: function() {
      alert("Json error");
   },
   dataType: 'json',
   success: function(data) {

    console.log("JSON temperature apartment data revieced - day!");
    console.log(data.length);

    if (data.length === 0) {
      //No data exits - buld a test database with objects
      for (var i = 24 - 1; i >= 0; i--) {
      var test = {
        date: new Date(),
        data_0: 20 + i
      }
      data.push(test);
    }
  }

buildTemperatureGraphWithData(data.length, data, document.getElementsByClassName("graph-week-colum-bar-container")[1]);

    //logSensorData();
   },
   type: 'GET'
});

}); //document ready end


function buildTemperatureGraphWithData (duration, dataSetArray, onObject) {
//Experiment with graph

//buildGraphWithData(12,["120px", "110px", "100px", "90px", "80px", "70px", "60px", "50px", "40px", "20px", "10px" ,"0px"], document.getElementsByClassName("graph-week-colum-bar-container")[0]);

//Graph-Week-Colum-Bar-Container - (is where the garp bars are)

//HTML for day graph
//var graph = document.getElementsByClassName("graph-week-colum-bar-container")[0];

var averageDataSet = [];

for (var i = 0; i < dataSetArray.length -1; i++) {

if (i % 2 === 0) {

var newValue = (dataSetArray[i].data_0 + dataSetArray[i + 1].data_0) / 2;
var dateFromString = new Date(dataSetArray[i].date);
var newTime = dateFromString.getHours();

console.log(newTime + ' Count:  ' + i);

var newDataObject = {
  value: newValue,
  time: newTime
};

averageDataSet.push(newDataObject);
  }
};

console.log(averageDataSet);

var buildResult = ''; 

var minTemp = averageDataSet[0].value;
var maxTemp = averageDataSet[0].value;

for (var i = 0; i < averageDataSet.length; i++)
{
  if (averageDataSet[i].value > maxTemp) {
    maxTemp = averageDataSet[i].value;
  }
  if (averageDataSet[i].value < minTemp) {
    minTemp = averageDataSet[i].value;
  }
};

console.log("Min temp is:" + Math.round(minTemp));
console.log("Max temp is:" + Math.round(maxTemp));

//Show the correstonding graph


var graphBarScale = 145 / maxTemp;

for (var i = 0; i < averageDataSet.length; i++) {
console.log('Count the bars created:' + ' ' + i);
var height = averageDataSet[i].value * graphBarScale;
var timeStamp = averageDataSet[i].time;
buildResult += '<div class="graph-row w-row"><div class="column-9 w-col w-col-10"><div class="graph-bar temperature-bar" id="Temp-Graph-Day-9" style="height: ' + height + ';"></div></div><div class="w-col w-col-2"><div class="text-block-3">' + timeStamp + '</div></div></div>'; 
}
  
/*onObject*///document.getElementsByClassName("graph-week-colum-bar-container")[1].innerHTML = 

$('#temperature-indicator-5').html("<p>" + Math.round(maxTemp) + "</p>");
$('#temperature-indicator-5').html("<p>" + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 +"</p>");
$('#temperature-indicator-5').html("<p>" + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 +"</p>");
$('#temperature-indicator-5').html("<p>" + Math.round(maxTemp) / 5 + Math.round(maxTemp) / 5 +"</p>");
$('#temperature-indicator-5').html("<p>" + Math.round(maxTemp) / 5 +"</p>");
$('#temperature-indicator-5').html("<p>" + 0 + "</p>");

$(".graph-week-colum-bar-container").eq(1).html(buildResult);

$(".history-section").eq(1).show();

}
