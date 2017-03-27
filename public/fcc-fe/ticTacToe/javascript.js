var ticTacToeBoardObject = function(){
    var board = [];
    this.gameFinished = false;

    var clearBoard = function (){
        board = [];
        //this.gameFinished = false;

        for (var i=0 ; i<3; i++){
            board.push([]);
            for (var j=0; j< 3; j++){
                //console.log(i + " " + j) ;
                board[i].push([]);
            }
        }
    }
    this.clearBoard = clearBoard;
    this.board      = board;
    


    var getBoard = function(){
        return board;
    }
    this.getBoard = getBoard;


    var setXO = function (x,y,value){
        if ((board[x][y] !== "x") &&(board[x][y] !== "o")  ){
            board[x][y] = value;
            return true;
        }
            return false
        //console.log(getBoard());
    }
    this.setXO = setXO;


    var checkRows = function(){
        //console.log( testBoxes(board) ) ;
        return testBoxes(board);
    }
    this.checkRows = checkRows;

    var checkColumns = function(){
        var columns = [];
        for(var col = 0; col < board.length; col++ ){
                    columns.push([]);
                    //console.log("board col: ");
                    //console.log( (board[col]) ) ;             
            for(var row = 0; row < board[col].length ; row++){
                columns[col].push(board[row][col]); 
            }
        }
        return  testBoxes(columns)
    };
    this.checkColumns = checkColumns;

    var checkDiagonals = function(){
        diags = [];
        diags.push([ board[0][0], board[1][1], board[2][2]]);
        diags.push([ board[0][2], board[1][1], board[2][0]]);
        //console.log(diags);

        //console.log( testBoxes(diags) );
        return  testBoxes(diags);        
    }
    this.checkDiagonals = checkDiagonals;

    var checkFilled = function(){
        if (( String( board ).replace(/,/g,"") ).length == 9 ){
            return true;            
        }else{
            return false;
        } 
    }
    this.checkFilled = checkFilled;

    var testBoxes = function (arraysToCheck){    
        var winnerFound = arraysToCheck.map(function (arrayToCheck){
            //console.log(column);
            if  ( (/xxx/).test(String(arrayToCheck).replace( /,/g,"" ) )  ||
                  (/ooo/).test(String(arrayToCheck).replace( /,/g,"" ) ) ){
                      //console.log("true");
                      return true;
                  }            
        });
        if(winnerFound.indexOf(true) > -1 ){
            return true;
        }else{
            return false;
        }
    }

    var checkAll = function(){
        if ((checkColumns() || checkRows() || checkDiagonals()) ){
            this.gameFinished = true;
            console.log("Found a winner!");
            return true;
        }else{
            return false;
        }
        
    }
    this.checkAll = checkAll;


    var drawBoard = function (){
        for(var row =0; row < board.length; row++ ){
            for(var rowItem = 0; rowItem < board[row].length ; rowItem++ ){
                $("#box"+row+ rowItem ).text(board[row][rowItem]);

            }
        }
    }
    this.drawBoard = drawBoard;


    var displayWinner = function(winnerText){

        $("#winnerText")
        .text(winnerText)
        .animate({
            opacity: 1,
            height: "2 em"
        }, 5000, function() {
            //this.gameFinished = true;
        })
        .animate({
            opacity: 0,
            //height: "toggle"
        }, 5000, function() {
            // Animation complete.
        });
    }
    this.displayWinner = displayWinner;




}






var playerTwo = function(board){
    var boardValues = board.getBoard();
    var plannedBoardValue;
    var playerTwoX;
    var playerTwoY;
    var playerAction = {};
    
    do{
        playerTwoX = Math.floor(Math.random() * boardValues.length) ;
        playerTwoY = Math.floor(Math.random() * boardValues.length) ;
        //console.log(playerTwoX);
        //console.log(playerTwoY);
        console.log("Current Value of X Y For Player Two: " + boardValues[playerTwoX][playerTwoY]);
        plannedBoardValue = boardValues[playerTwoX][playerTwoY];
    }while(plannedBoardValue == "x" || plannedBoardValue == "o")

    playerAction.id = String( playerTwoX).concat( playerTwoY);
    //playerAction.id = "xy";

    console.log(playerAction)
    keyPressed(playerAction);

}








var myBoard;
var lastPressed;
var playerSelect;
var playerOneTurn;
$(document).ready(function(){
    console.log("Loaded JS");
    myBoard = new ticTacToeBoardObject;
    myBoard.clearBoard();
    playerOneTurn = true;
    //lastPressed = "x";
    $("#messageBox").html(
        '<button class="btn btn-primary playerSelect" value="onePlayer">One Player</button>'+
        '<button class="btn btn-primary playerSelect" value="twoPlayer">Two Player</button>    '        
    );
    $(".playerSelect").click(function(){
        playerSelect = $(this)[0].value;
        console.log(playerSelect);
        $("#messageBox").html(
            '<div class="btn-group"> <button class="btn btn-primary pieceSelect" value="x">X</button>'+
            '<button class="btn btn-primary pieceSelect" value="o">O</button>'+
            '</div>'
        );


        $(".pieceSelect").click(function(){
            var selectedPiece = $(this)[0].value;
            console.log(selectedPiece);
            if(selectedPiece === "x"){
                lastPressed = "o";
            }else{
                lastPressed = "x";
            }

            $(".pieceSelect").animate({
                height: "0px",
                opacity: 0
            }, 1000, function(){
                $("#messageBox").html(
                    '<div id="winnerText">'+
                        '<p></p>'+
                    '</div>'
                );

                $(".box").animate({
                    opacity:1
                },1000);
            });
        });


    });


    //Dealing with button clicks
    $(".box").click(function(){
        var buttonClicked ={};
        buttonClicked = $(this) ;
        keyPressed (buttonClicked);



    });
});




function keyPressed (key){

    if (myBoard.gameFinished == true){return}

    var currentKey;
    if (lastPressed === "o"){
        currentKey = "x";
    }else{
        currentKey = "o";
    }
    console.log(myBoard);


    var id = key.id || key[0].id;
    var idArray = Array.from(id);
    var y = idArray.pop();
    var x = idArray.pop();
    var isUsed =  /[x,o]/.test((myBoard.getBoard())[x][y]);
    
    //console.log("is used:" + isUsed);
    if (isUsed) {return;}
    myBoard.setXO(x,y,currentKey);
    lastPressed = currentKey;
     
    myBoard.drawBoard();

    if(myBoard.checkAll()){
        myBoard.displayWinner(currentKey + " is the Winner!");
        $(".box")
        .animate({
            opacity: 0,
        }, 3000, function() {
            // Animation complete.
            myBoard.clearBoard();
            myBoard.drawBoard();
            myBoard.gameFinished = false;
            $(".box").animate({
                opacity: 1,
                }, 1000, function() {
            });

        });

    };

    if((myBoard.checkFilled())){
        console.log("Check All for All Filled: " + myBoard.checkAll())
        if(myBoard.checkAll() != true){
        myBoard.displayWinner("WINNER: NONE");
        $(".box")
        .animate({
            opacity: 0,
        }, 3000, function() {
            myBoard.clearBoard();
            myBoard.drawBoard();
            myBoard.gameFinished = false;
            $(".box").animate({
                opacity: 1,
                }, 1000, function() {
            });
        });
        }
    }

    if(playerOneTurn ){
        playerOneTurn = false;
        if(playerSelect == "onePlayer"){
            if (myBoard.gameFinished !== true){
                playerTwo(myBoard);
            }
        }
    }else{
        playerOneTurn = true;
    }


}

