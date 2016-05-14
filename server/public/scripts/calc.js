var num1 = '';
var num2 = '';
var type = 'default';
var boxfitOptions = {
  align_center:false
};
$(document).ready(function(){
fitText();
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
  $('#num').empty();
if (type == 'default'){
  num1 += $(this).attr('id');
  $('#num').text(num1);
  fitText();
} else {
  num2 += $(this).attr('id');
  $('#num').text(num2);
  fitText();
}
}
//Empties all fields that contain data the user has manipulated.
function clearFields(){
  $('#num').empty();
  num1 = '';
  num2 = '';
  type = 'default';
}
function fitText(){
  $('#num').boxfit(boxfitOptions);
}

function swapSign(){
  if ($('#num').text()[0] == '-'){
    if (type == 'default'){
      num1 = num1.substring(1);
      $('#num').text(num1);
      fitText();
    } else {
      num2 = num2.substring(1);
      $('#num').text(num2);
      fitText();
  }
} else {
  if (type === 'default'){
    num1 = '-' + num1;
    $('#num').text(num1);
    fitText();
  } else {
    num2 = '-' + num2;
    $('#num').text(num2);
    fitText();
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
  clearFields();
$('#num').text(answer);
fitText();
if(answer != "Err"){
  num1 = answer;
}
}

});

}
