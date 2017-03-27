
var Simon = function(){
    var simonColorArray = ["red","blue","green","yellow"];
    var history;
    var inputHistory;
    this.simonColorArray = simonColorArray;

    var newGame = function(){
        history = [];
        //console.log(history);
        clearInputHistory();
    }
    this.newGame = newGame;


    var clearInputHistory = function(){
        inputHistory = [];
    }
    this.clearInputHistory = clearInputHistory;


    var addColor = function(color){
        var newColor = color || simonColorArray[ Math.floor(Math.random() * simonColorArray.length )];
        history.push( newColor )
        return newColor;
    }
    this.addColor = addColor;   


    var getHistory = function(){
        return history;
    }
    this.getHistory = getHistory;


    var addInput = function(color){
        inputHistory.push(color);
        if (checkInputCorrect() !== true ){
            //inputHistory.pop();
            clearInputHistory();
            alertFailed();
            return false;
        };
        return true;
    }
    this.addInput = addInput;

    var getInputHistory = function(){
        return inputHistory;
    }
    this.getInputHistory = getInputHistory;

    var checkInputCorrect = function(){
        for(var i =0 ; i < inputHistory.length; i++){
            if(inputHistory[i] !== history[i]){
                return false;
            }
        }
        return true;
    }
    this.checkInputCorrect = checkInputCorrect;


    var alertFailed = function(){
        console.log("You Failed...");

        //return false;
        //newGame();
        //console.log("NEW GAME STARTING");
    }
 
    var getSteps = function(){
        return history.length;
    }
    this.getSteps = getSteps;
}








var simon;
var speedArray = [  [[1], [1.0]],[[2], [1.0]],[[3], [1.0]],[[4], [1.0]],[[5], [0.8]],
                    [[6], [0.8]],[[7], [0.8]],[[8], [0.8]],[[9], [0.7]],[[10],[0.7]],
                    [[11],[0.7]],[[12],[0.7]],[[13],[0.5]],[[14],[0.5]],[[15],[0.5]],
                    [[16],[0.5]],[[17],[0.5]],[[18],[0.5]],[[19],[0.5]],[[20],[0.5]] ];
var speed;
var strictEnabled = false;

$(document).ready(function(){
    console.log("Loaded JS");

    simon = new Simon;

    $("#start").on("click",
    function (){
        newSimonGame();
    });

    $("#reset").on("click",
    function(){
        newSimonGame();
    });

    $("#strict").on("click",
    function(){


        if(strictEnabled === true){
            $("#strict").removeClass("strictEnabled").text("Strict");
            strictEnabled= false;
        }else{
            $("#strict").addClass("strictEnabled").text("Strict Enabled");
            strictEnabled= true;
        }

    });


    $(".colorButton").on("click",
    function (){
        var colorButtonColor = $(this)[0].value;
        addSimonInput(colorButtonColor);
    });


    console.log(simon.getHistory() ) ;
});









function addSimonInput(colorButtonColor){
    var isValid = simon.addInput(colorButtonColor);
    console.log("isValid: " +isValid);
    
    if(isValid !== true ){
        $("#stepCounter").text( "!!" );

        if(strictEnabled){
            newSimonGame();
            return;
        }
        

        displayHistory();        
        return
    }

    lightup(colorButtonColor);
    console.log("Input History: " + simon.getInputHistory() );
    if(simon.getInputHistory().length == simon.getHistory().length ){
         addSimonColor()
    }
}

function addSimonColor(color){
    simon.clearInputHistory();
    simon.addColor(color);

    var steps = simon.getSteps();

    if(steps <= 20){
        displayHistory();
        $("#stepCounter").text( steps );
    }else{
        $("#gameContainer").html("<h1>Simon Says You Win!</h1>");
    }
}

function displayHistory(){
    var simonHistory = simon.getHistory();    
    console.log(simonHistory);
    console.log(speedArray[simonHistory.length]);
    speed = (speedArray[simonHistory.length][1]);

    var i = 0;
    var displayColorCounter = window.setInterval((function(){
        
        var currentColor = simonHistory[i]
        lightup(currentColor);
        
        i++;
        if (i >= simonHistory.length ){
            clearInterval(displayColorCounter);
        }
        $("#stepCounter").text( simon.getSteps() );

    }), (2000 *speed) );
}

function newSimonGame (){

        simon.newGame();
        speed = 1;
        var color = simon.addColor();
        lightup(color);
        $("#stepCounter").text(simon.getSteps());

}

function lightup(color){
    var activeDiv  = ".".concat(color); 
    var activeClass = color.concat("-light");
    var activeSound = color.concat("-audio");
    $(activeDiv).addClass(activeClass);
    document.getElementById( activeSound ).play();
    //$.playSound("https://s3.amazonaws.com/freecodecamp/simonSound1")


    var myTimer = setTimeout(function(){
        clearTimeout( myTimer);
        console.log("Timeout after 1 second");
        $(activeDiv).removeClass(activeClass);
    }, (1000 *speed ) );
}
