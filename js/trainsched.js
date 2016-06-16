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
  			$("#rate").val('');

  return false;
});





$('#clearAll').on('click', function(){
	  		$("#train").val('');
  			$("#destination").val('');
  			$("#firstTrain").val('');
  			$("#freq").val('');

        return false;
});//clearAll

awaitingRoom.on('child_added', function(child, prevChild){
  console.log(child.val().name);
  // for(var i = 0; i < child.length; i++){
    row = $('<tr>');
    tTrain = $('<td>'+ child.val().train +'</td>');
    tDestination = $('<td>'+ child.val().destination+'</td>');
    tNextArrive = $('<td>'+ child.val().firstTrain +'</td>');
    tMinutesAway = $('<td>'+ child.val().firstTrain +'</td>');
    tFreq = $('<td>'+ child.val().freq+'</td>');
    row.append(tTrain, tDestination, tFreq, tNextArrive, tMinutesAway);
    $('tbody').append(row)
  // }
})


});//doc.ready