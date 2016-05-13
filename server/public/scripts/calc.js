$(document).ready(function(){
var num1;
var num2;
var type;
var calcObject = {};
$('.op').on('click', function(){
  event.preventDefault();
  num1 = getFormData($('#num1'));
  num2 = getFormData($('#num2'));
  type = $(this).data('op');
  console.log(type);
  calcObject.x = num1.num1;
  calcObject.y = num2.num2;
  calcObject.type = type;
  postCalc(calcObject);
});
});

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
