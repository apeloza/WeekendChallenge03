var num1 = '';
var num2 = '';
var type = 0;
$(document).ready(function(){

for (var i = 0; i < 10; i++){
$('#inputNums').append('<button class = "numbtn" id = "' + i + '">' + i + '</button>')
}

$('#inputNums').on('click', '.numbtn', saveNum);
//Listens for a click on an operator, then fetches data from the DOM.
$('.op').on('click', function(){

 type = $(this).data('op');
 $('#operator').text(type);
  //postCalc(toObj(x,y,type));
});
$('#calculate').on('click',postCalc);
//Clears the fields on click of the C button.
$('.clear').on('click', clearAll);

});

function saveNum (){
if (type === 0){
  num1 += $(this).attr('id');
  $('#num1').text(num1);
} else {
  num2 += $(this).attr('id');
  $('#num2').text(num2);
}
}
//Empties all fields that contain data the user has manipulated.
function clearFields(){
  $('#num1').empty();
  $('#num2').empty();
  $('#operator').empty();
  num1 = '';
  num2 = '';
  type = 0;
}
function clearAll(){
  $('#num1').empty();
  $('#num2').empty();
  $('#operator').empty();
  num1 = '';
  num2 = '';
  type = 0;
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
function postCalc(){

$.ajax({
type: 'POST',
url: '/calc',
data: toObj(num1,num2,type),
success: function(answer){
$('.answer-container').text(answer);
clearFields();
}

});

}
