//Global variables are initialized
var num1 = '';
var num2 = '';
var hasDecimal = false;
var type = 'default';
var boxfitOptions = {
    align_center: false
};

$(document).ready(function() {

    //The starter text is fitted to the screen, and then event listeners are created.
    fitText();

    //Listens for number clicks
    $('.numbtn').on('click', saveNum);

    //Listens for clicks on the decimal button
    $('.decbtn').on('click', addDecimal);

    //Listens for clicks on the square root button
    $('.sqrt').on('click', squareRoot);

    //Listens for a click on an operator, then saves the operator type.
    $('.op').on('click', function() {

        type = $(this).data('op');
        $('#num').empty();

        //hasDecimal is reset so that the 2nd number in the equation is capable of being a decimal.
        hasDecimal = false;
    });

    //Listens for clicks on the = button
    $('#calculate').on('click', postCalc);

    //Clears the fields on click of the C button.
    $('.clear').on('click', clearFields);

    //Listens for clicks on the +/- button, and swaps the - symbol in/out
    $('.toggleneg').on('click', swapSign);

});

//This function builds the numbers used in the calculator's equation.
function saveNum() {

    //The display is cleared.
    $('#num').empty();

    //The if statement checks to see if this is the first number or the 2nd (by checking if an operator has been pressed)
    if (type == 'default') {
        num1 += $(this).attr('id');
        $('#num').text(num1);
        fitText();
    } else {
        num2 += $(this).attr('id');
        $('#num').text(num2);
        fitText();
    }
}

//This function handles adding decimals to either number
function addDecimal() {

    //This if checks to see if num1 or num2 is active, and if num1 or num2 have decimals already.
    if (type == 'default' && hasDecimal === false) {
        num1 += $(this).attr('id');
        $('#num').text(num1);
        fitText();
        hasDecimal = true;
    } else if (hasDecimal === false) {
        num2 += $(this).attr('id');
        $('#num').text(num2);
        fitText();
        hasDecimal = true;
    }
}

//This function gets the square root of a number.
function squareRoot() {

    //This if statement checks to see if num1 or num2 is active, and if num1 or num2 are negative.
    if (type == 'default' && $('#num').text()[0] != '-') {
        num1 = Math.sqrt(num1);
        $('#num').text(num1);
        fitText();
    } else if ($('#num').text()[0] != '-') {
        num2 = Math.sqrt(num2);
        $('#num').text(num2);
        fitText();

        //If a number is negative, return an error.
    } else {
        $('#num').text('Err');
        fitText();
    }
}

//Empties all fields and variables that contain data the user has manipulated.
function clearFields() {
    $('#num').empty();
    num1 = '';
    num2 = '';
    type = 'default';
}

//Uses the boxfit plugin to re-size the numbers being displayed. Also checks on the eggs.
function fitText() {
    $('#num').boxfit(boxfitOptions);
    checkEggs($('#num').text());
}

//Switches the - sign on and off for num1 and num2.
function swapSign() {

    //If the negative sign is on the front, make a substring that chops off the -. Otherwise, concatenate a - onto the front.
    if ($('#num').text()[0] == '-') {
        if (type == 'default') {
            num1 = num1.substring(1);
            $('#num').text(num1);
            fitText();
        } else {
            num2 = num2.substring(1);
            $('#num').text(num2);
            fitText();
        }
    } else {
        if (type === 'default') {
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
function toObj(x, y, type) {
    var calcObject = {
        x: x,
        y: y,
        type: type
    };
    return calcObject;
}

//Sends an equation object to the server, then appends the answer from the server to the DOM.
function postCalc() {

    $.ajax({
        type: 'POST',
        url: '/math/' + type,
        data: toObj(num1, num2, type),
        success: function(answer) {
            clearFields();
            $('#num').text(answer);
            fitText();

            //This if statement ensures that "Err" is never accidentally concatenated.
            if (answer != "Err") {
                num1 = answer;
            }
        }

    });

}

//This function checks on all the eggs in the yard.
function checkEggs(displaynum) {

    //When it's sunny on a rainy day ...
    if (displaynum == 404) {
        $('.container').addClass('rainbowbox');
    }

    //Checks for teenagers with attitude
    if (displaynum == 10000) {
        var tenThousand = new Audio('../assets/audio/free.mp3');
        tenThousand.play();
    }

    //Don't answer the phone to just anyone
    if (displaynum == 1989) {
        var miami = new Audio('../assets/audio/miami.mp3');
        miami.play();
    }
}
