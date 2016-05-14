var num1 = '';
var num2 = '';
var type = 0;
$(document).ready(function(){

$('.numbtn').on('click', saveNum);
//Listens for a click on an operator, then fetches data from the DOM.
$('.op').on('click', function(){

 type = $(this).data('op');
$('#num').empty();
});
$('#calculate').on('click',postCalc);
//Clears the fields on click of the C button.
$('.clear').on('click', clearFields);

$('.toggleneg').on('click', swapSign);

});

function saveNum (){
if (type === 0){
  num1 += $(this).attr('id');
  $('#num').text(num1);
} else {
  num2 += $(this).attr('id');
  $('#num').text(num2);
}
}
//Empties all fields that contain data the user has manipulated.
function clearFields(){
  $('#num').empty();
  num1 = '';
  num2 = '';
  type = 0;
}

function swapSign(){
  if ($('#num').text()[0] == '-'){
    if (type === 0){
      num1 = num1.substring(1);
      $('#num').text(num1);
    } else {
      num2 = num2.substring(1);
      $('#num').text(num2);
  }
} else {
  if (type === 0){
    num1 = '-' + num1;
    $('#num').text(num1);
  } else {
    num2 = '-' + num2;
    $('#num').text(num2);
}
}
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
url: '/math/' + type,
data: toObj(num1,num2,type),
success: function(answer){
$('#num').text(answer);
clearFields();
num1 = answer;
}

});

}
