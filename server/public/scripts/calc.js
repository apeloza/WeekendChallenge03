$(document).ready(function(){
var type;

$('.op').on('click', function(){
  event.preventDefault();
  var x = $('#num1').val();
  var y = $('#num2').val();
  var type = $(this).data('op');
  postCalc(toObj(x,y,type));
});

$('.clear').on('click', clearFields);

});

function clearFields(){
  $('#num1').empty();
  $('#num2').empty();
  $('.answer-container').empty();
}

function toObj(x, y, type){
  var calcObject = {
    x: x,
    y:y,
    type:type
  };
  return calcObject;
}
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
//read in a form's data and convert it to a key:value object
function getFormData(dom_query){
    var out = {};
    var s_data = $(dom_query).serializeArray();
    //transform into simple data/value object
    for(var i = 0; i<s_data.length; i++){
        var record = s_data[i];
        out[record.name] = record.value;
    }
    return out;
  }
