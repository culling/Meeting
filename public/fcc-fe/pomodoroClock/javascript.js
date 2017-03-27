
var PomodoroObject = function (workMinutesIn, workSecondsIn, breakMinutesIn, breakSecondsIn) {

    var workMinutes = workMinutesIn;
    var workSeconds = workSecondsIn;
    var breakMinutes = breakMinutesIn;
    var breakSeconds = breakSecondsIn;
    var currentWorkMinutes = workMinutes;
    var currentWorkSeconds = workSeconds;
    var currentBreakMinutes = breakMinutes ;
    var currentBreakSeconds = breakSeconds ;
    var totalWorkSeconds;
    var totalBreakSeconds;

    this.workMinutes        = workMinutes;
    this.workSeconds        = workSeconds;
    this.breakMinutes       = breakMinutes;
    this.breakSeconds       = breakSeconds
    this.currentWorkMinutes = currentWorkMinutes;
    this.currentWorkSeconds = currentWorkSeconds;
    this.currentBreakMinutes = currentBreakMinutes;
    this.currentBreakSeconds = currentBreakSeconds;




    var resetWorkMinutes = function (){
        
        currentWorkMinutes = Number.parseInt(workMinutes) ;
        currentWorkSeconds = Number.parseInt(workSeconds);
        totalWorkSeconds   = (workMinutes*60)+ workSeconds; 
    };

    var resetBreakMinutes = function (){
        currentBreakMinutes = Number.parseInt(breakMinutes);
        currentBreakSeconds = Number.parseInt(breakSeconds);
        totalBreakSeconds   = (breakMinutes*60) + breakSeconds;
    }

    this.resetWorkMinutes = resetWorkMinutes;
    this.resetBreakMinutes = resetBreakMinutes;


     var countWorkMinutes = function (){
         resetWorkMinutes();
        $("#timeLeft").css({'animation': 'fillIt '+ totalWorkSeconds +'s 100' });
        $("#timeLeft").addClass("work");
        $("#timeLeftClockText").text("Work");
        var currentWorkCounter = window.setInterval((function (){
            if ((currentWorkMinutes <= 0 ) && (currentWorkSeconds <= 0 )){ 
                window.clearInterval(currentWorkCounter);
                console.log("count Finished for Current Work Minutes");
                resetWorkMinutes() ;
                $("#timeLeft").removeClass("work");
                countBreakMinutes() ;
            };
            if (currentWorkSeconds <= 0 ){
                currentWorkMinutes--;
                currentWorkSeconds = "60";
            };
            currentWorkSeconds--;
            //console.log( currentWorkMinutes + ":" +  ("0" + currentWorkSeconds ).slice(-2) ) ;
            //console.log( formattedTime(currentWorkMinutes, currentWorkSeconds) );
            $("#timeLeft").val( formattedTime(currentWorkMinutes, currentWorkSeconds) );
        }), 1000 ) ;

    };

    this.countWorkMinutes = countWorkMinutes;
    
    var countBreakMinutes = function  (){
        resetBreakMinutes();
        $("#timeLeft").css({'animation': 'fillIt '+ totalBreakSeconds +'s 100' });
        $("#timeLeft").addClass("break");
        $("#timeLeftClockText").text("Rest");

        //$("#timeLeft").css("background-color", "rgb(200,100,100)");
        var currentBreakCounter = window.setInterval((function (){
            if ((currentBreakMinutes <= 0 ) && (currentBreakSeconds <= 0 )){ 
                window.clearInterval(currentBreakCounter);
                console.log("count Finished for Current Break Minutes");
                resetBreakMinutes() ;
                $("#timeLeft").removeClass("break");
                countWorkMinutes() ;
            };
            if (currentBreakSeconds <= 0 ){
                currentBreakMinutes--;
                currentBreakSeconds = "60";
            };
            currentBreakSeconds--;
            //console.log(formattedTime (currentBreakMinutes, currentBreakSeconds));
            $("#timeLeft").val(formattedTime (currentBreakMinutes, currentBreakSeconds) );
        }), 1000 )
    };
    this.countBreakMinutes = countBreakMinutes;

    var increaseWorkMinutes = function (){
        this.workMinutes = workMinutes++;
        $("#pomodoroDuration").val( formattedTime(workMinutes, workSeconds) );
        $("#timeLeft").val( formattedTime(workMinutes, workSeconds) );

    }
    this.increaseWorkMinutes = increaseWorkMinutes;

    var decreaseWorkMinutes = function(){
        if (workMinutes > 0 ){
            this.workMinutes = workMinutes--;
            $("#pomodoroDuration").val( formattedTime(workMinutes, workSeconds) );
            $("#timeLeft").val( formattedTime(workMinutes, workSeconds) );
        }
    }
    this.decreaseWorkMinutes = decreaseWorkMinutes;

    var increaseBreakMinutes = function (){
        this.breakMinutes = breakMinutes++;
        $("#breakDuration").val( formattedTime(breakMinutes, breakSeconds) );
    }
    this.increaseBreakMinutes = increaseBreakMinutes;

    var decreaseBreakMinutes = function(){
        if (breakMinutes >0){
            this.breakMinutes = breakMinutes--;
           $("#breakDuration").val( formattedTime(breakMinutes, breakSeconds) );
       }
     
    }
    this.decreaseBreakMinutes = decreaseBreakMinutes;

    var formattedTime = function(minutes, seconds){
        return ( minutes + ":" +  ("0" + seconds ).slice(-2) ) ;                
    }
    this.formattedTime = formattedTime;

    $("#pomodoroDuration").val(formattedTime (workMinutes, workSeconds) );
    $("#breakDuration").val( formattedTime(breakMinutes, breakSeconds) );
    $("#timeLeft").val( formattedTime(workMinutes, workSeconds) );

};



var myClock;
$(document).ready(function(){
    myClock = new PomodoroObject(2,0,2,0);
    //console.log(myClock);
    
    //myClock.countWorkMinutes() ;
    //Dealing with button clicks

    $(".btn").click(function(){
        var buttonClickedValue ="";
        buttonClickedValue = $(this)[0].value ;
        //console.log("you clicked: ");
        //console.log(buttonClickedValue );
        keyPressed (buttonClickedValue);
    });


}); 

$(document).keydown(function(keyEvent){
    var key = keyEvent.key;
    //console.log("you pressed: ");
    //console.log( key);
    keyPressed (key);
});

function clearAllIntervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
}

function regenClock(){
        var workMinutesNew = myClock.workMinutes ;
        var workSecondsNew = myClock.workSeconds;
        var breakMinutesNew = myClock.breakMinutes;
        var breakSecondsNew = myClock.breakSeconds;
        myClock = new PomodoroObject(workMinutesNew, workSecondsNew, breakMinutesNew, breakSecondsNew );
}

function keyPressed (key){
    var numbersReg = /^[0-9]$/;
    var operatorsReg = /^[-+]$/;
    //var decimalReg = /[\.]/;
    var enterReg   = /^Enter$/;
    var cReg        = /^c$/;
    var backspaceReg = /^Backspace$/;
    var breakReg     = /^break/;
    if(numbersReg.test(key)){
        
    }

  
    if(operatorsReg.test(key)){
        //addOperator(key);
        if (key === "+"){
            myClock.increaseWorkMinutes();
        }
        if (key ==="-"){
            myClock.decreaseWorkMinutes();
        }
    }

    if(enterReg.test(key)){
        clearAllIntervals();
        myClock.countWorkMinutes();
    }

    if(cReg.test(key)){
        clearAllIntervals();
        regenClock();
    }

    if(backspaceReg.test(key)){
        //myClock.workMinutes = Number.parseInt( Array.from(myClock.workMinutes).shift() );
    }
    
    if(breakReg.test(key) ){
        if(key === "break+"){
            myClock.increaseBreakMinutes();
        }
        if (key === "break-"){
            myClock.decreaseBreakMinutes();
        }
    }

}

