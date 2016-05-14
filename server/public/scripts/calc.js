$(document).ready(function(){

//Listens for a click on an operator, then fetches data from the DOM.
$('.op').on('click', function(){
  event.preventDefault();
  var x = $('#num1').val();
  var y = $('#num2').val();
  var type = $(this).data('op');
  postCalc(toObj(x,y,type));
});

//Clears the fields on click of the C button.
$('.clear').on('click', clearFields);

});

//Empties all fields that contain data the user has manipulated.
function clearFields(){
  $('#num1').empty();
  $('#num2').empty();
  $('.answer-container').empty();
}

//Creates an equation object to be sent to the server
function toObj(x, y, type){
  var calcObject = {
    x: x,
    y:y,
    type:type
  };
  return calcObject;
}

//Sends an equation object to the server, then appends the answer from the server to the DOM.
function postCalc(calculation){

$.ajax({
type: 'POST',
url: '/calc',
data: calculation,
success: function(answer){
$('.answer-container').text(answer);
}

});

}
