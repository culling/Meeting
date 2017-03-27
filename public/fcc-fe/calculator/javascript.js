
// initalise the numbers
var currentNumber;
var currentEquation;
var result;
$(document).ready(function(){
    console.log("Loaded JS");
    setEquationsToEmpty();
    $("#calcDisplay").val(currentNumber);


//Dealing with button clicks
$(".btn").click(function(){
    var buttonClickedValue ="";
    buttonClickedValue = $(this)[0].value ;
    console.log("you clicked: ");
    console.log(buttonClickedValue );
    keyPressed (buttonClickedValue);
});


});


$(document).keydown(function(keyEvent){
    var key = keyEvent.key;
    console.log("you pressed: ");
    console.log( key);
    keyPressed (key);
});

function keyPressed (key){
    var numbersReg = /[^F][0-9]/;
    var operatorsReg = /[/*-+]/;
    var decimalReg = /[\.]/;
    var enterReg   = /Enter/;
    var backspaceReg = /Backspace/;
    var cReg = /C/;
    if(numbersReg.test(key)){
        addNumber(key);
        $("#calcDisplay").val(currentNumber);
    }

    if(decimalReg.test(key)){
        addDecimal()
        $("#calcDisplay").val(currentNumber);
    }

    if(operatorsReg.test(key)){
        addOperator(key);
        $("#calcDisplay").val(currentNumber);
    }

    if(enterReg.test(key)){
        finishEquation();
    }

    if(backspaceReg.test(key)){
        clearLast();
    }

    if(cReg.test(key)){
        setEquationsToEmpty();
        $("#calcDisplay").val(currentNumber);
    }

    console.log("current equation to return");
    console.log("currentNumber:" + currentNumber );
}

function addNumber(numberString){
    console.log("The Number: " + numberString);
    if (currentNumber == 0){
        currentNumber = numberString;
    }else{
        currentNumber = currentNumber.concat(numberString);
    }
    $("#calcDisplay").val(currentNumber);
}

function addDecimal(){
    var decimalReg = /[\.]/;
    if(decimalReg.test (currentNumber) !== true ){
        currentNumber = currentNumber.concat(".");
    }
    $("#calcDisplay").val(currentNumber);
}



function addOperator (operator){
        console.log("The Operator: " + operator);
        currentEquation.push(currentNumber, operator);
        currentNumber = 0;
        $("#calcDisplay").val(currentNumber);
}

function finishEquation (){
        currentEquation.push(currentNumber);
        var equation = currentEquation.reduce(function(total, element){
            return total.concat(element);
        },"");

        result = eval(equation);
        console.log(result);
        $("#calcDisplay").val(result);
        setEquationsToEmpty()
}


function clearLast(){
    if (currentNumber === 0){ 
        currentEquation.pop()
    };
    currentNumber = 0;
    $("#calcDisplay").val(currentNumber);
}

function setEquationsToEmpty(){
    currentNumber   = 0.0;
    currentEquation = [];
}
