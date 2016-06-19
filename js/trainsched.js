$(function(){
  $('.parallax').parallax();

  var awaitingRoom = new Firebase("https://awaitingroom.firebaseio.com");


  $('#submit').on('click', function(){
    console.log("click");
  	train = $('#train').val().trim();
  	destination = $('#destination').val().trim();
  	firstTrain = $('#firstTrain').val().trim();
  	freq = $('#freq').val().trim();
    
  awaitingRoom.push({
    'train': train,
    'destination': destination,
    'firstTrain': firstTrain,
    'freq': freq
  });

  			$("#train").val('');
  			$("#destination").val('');
  			$("#firstTrain").val('');
  			$("#freq").val('');

  return false;
  });
  //clearAll
  $('#clearAll').on('click', function(){
  	  		$("#train").val('');
    			$("#destination").val('');
    			$("#firstTrain").val('');
    			$("#freq").val('');

          return false;
  });

awaitingRoom.on('child_added', function(child, prevChild){
  console.log(child.val().name);
  var firstTrain = child.val().firstTrain;
  var frequency = child.val().freq;

  var now = moment();
  console.log(moment(now).format("HH:mm"));

  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  var diff = moment().diff(moment(firstTrainConverted), "minutes");
  var tDiff = diff % frequency;
  console.log(tDiff);

  var minTilTrain = frequency - tDiff;
  console.log(minTilTrain);

  var next = moment().add(minTilTrain, "minutes");
  var arrival = moment(next).format("LT");

    row = $('<tr>');
      tTrain = $('<td>'+ child.val().train +'</td>');
      tDestination = $('<td>'+ child.val().destination+ '</td>');
      tNextArrive = $('<td>'+ arrival + '</td>');//add Moment.JS calculation
      tMinutesAway = $('<td>'+ minTilTrain + '</td>');//add Moment.JS calculation
      tFreq = $('<td>'+ child.val().freq+'</td>');
    row.append(tTrain, tDestination, tFreq, tNextArrive, tMinutesAway);
    $('tbody').append(row);
})


});//doc.ready    