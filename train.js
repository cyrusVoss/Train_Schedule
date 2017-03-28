// Initialize Firebase
var config = {
	apiKey: "AIzaSyCZwoGxsORWONyt4-TjhdlhTROPOYml3Rg",
	authDomain: "train-app-db11d.firebaseapp.com",
	databaseURL: "https://train-app-db11d.firebaseio.com",
	storageBucket: "train-app-db11d.appspot.com",
	messagingSenderId: "671364356500"
	};

firebase.initializeApp(config);

var database = firebase.database();

//button function for adding new information

$("#add-train").on("click", function(event){
	event.preventDefault();

	//Grabbing User Inputs From Form
	var trainName = $("#train-name").val().trim();
	var trainDest = $("#destination-input").val().trim();
	var trainTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var trainFreq = $("#frequency").val().trim();

	// creating object to store train information
	var newTrain = {
		name: trainName,
		destination: trainDest,
		time: trainTime,
		frequency: trainFreq
	};

	// takes the array we created and pushes it to the database
	database.ref().push(newTrain);

	// testing to see if the inputs are put into an array
	console.log(newTrain.time);

	$("#success").html("<strong>" + "Train Submitted Succesfully. Thank You!");

	$("#train-name").val("");
	$("#destination-input").val("");
	$("#train-time").val("");
	$("#frequency").val("");

});

database.ref().on("child_added", function(childShanpshot, prevChildKey){

	console.log(childShanpshot.val());

	var trainName = childShanpshot.val().name;
	var trainDest = childShanpshot.val().destination;
	var trainTime = childShanpshot.val().time;
	var trainFreq = childShanpshot.val().frequency;

	// var timeOfTrain = moment(trainTime, "HH:mm");

	// var timeOfFreq = moment(trainFreq, "mm"); 

	// trainTime into minutes
	var diffTrain = moment().diff(moment.unix(trainTime), "minutes");
	
	// finding the remainder between when train starts and frequency of train
	var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFreq ;

	//shows how many minutes until next train arrives
	var minutes = trainFreq - timeRemainder;

	//displays the hour of when the next train arrives
	var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 

	// pushing data and creating table rows
	 $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
});