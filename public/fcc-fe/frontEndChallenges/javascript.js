$(document).ready(function(){
    console.log("Loaded JS");


    //console.log(sym([1, 2, 3], [5, 2, 1, 4]));
    //console.log([3, 4, 5]);

    //console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]) );
    //console.log( [1, 2, 4, 5, 6, 7, 8, 9])


    //console.log(telephoneCheck("555-5555"));
    //console.log(telephoneCheck("555 555 5555"));
    //console.log(addTogether(2,3));
    //console.log(addTogether(2)([3]));    
    /*truthCheck([{"user": "Tinky-Winky", "sex": "male"},
            {"user": "Dipsy", "sex": "male"},
            {"user": "Laa-Laa", "sex": "female"},
            {"user": "Po", "sex": "female"}],
             "sex");
            //return True
    */
    //binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");
    //console.log (steamrollArray([1, {}, [3, [[4]]]]  ) );
    //dropElements([1, 2, 3], function(n) {return n < 3; });
    //dropElements([1, 2, 3, 4], function(n) {return n >= 3;})
    //dropElements([0, 1, 0, 1], function(n) {return n === 1;})

    //console.log( smallestCommons([1, 5]) );
    //sumPrimes(977);
    //sumFibs(1000);
    //spinalCase('This Is Spinal Tap');
    //convertHTML("Dolce & Gabbana");
    //uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
    //booWho(null);
    //fearNotLetter("abce");
    //pairElement("GCG");
    //translatePigLatin("consonant");
    //myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
    //convertToRoman(68);
/*
    var result = whatIsInAName([{ first: "Romeo", last: "Montague" },
        { first: "Mercutio", last: null },
        { first: "Tybalt", last: "Capulet" }],
        { last: "Capulet" });
    console.log(result);
*/
    //console.log(updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]));
    //console.log('should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]]');
    
    /*    
    console.log(permAlone('aabb'));
    console.log("should return 8");
    
    console.log(permAlone("abfdefa"));
    console.log("should return 2640.");

    console.log(permAlone("zzzzzzzz"));
    console.log("should return 0");
    */

    //console.log(permAlone("aabb"));

    /* */
    /*
    console.log(    makeFriendlyDates(["2016-07-01", "2016-07-04"]) );
    console.log(    'should return ["July 1st","4th"]' );

    console.log(makeFriendlyDates(["2016-12-01", "2017-02-03"]));
    console.log('should return ["December 1st","February 3rd"]');

    console.log(makeFriendlyDates(["2016-12-01", "2018-02-03"]));
    console.log('should return ["December 1st, 2016","February 3rd, 2018"]');
    

    console.log(makeFriendlyDates(["2017-03-01", "2017-05-05"]));
    console.log( 'should return ["March 1st, 2017","May 5th"]' );

    console.log(makeFriendlyDates(["2018-01-13", "2018-01-13"]) );
    console.log( 'should return ["January 13th, 2018"]' );
    
    
    
    console.log(makeFriendlyDates(["2022-09-05", "2023-09-04"]));
    console.log('should return ["September 5th, 2022","September 4th"]');

    console.log(makeFriendlyDates(["2022-09-05", "2023-09-05"]));
    console.log('should return ["September 5th, 2022","September 5th, 2023"]');
    /* */
/*
var bob = new Person('Bob Ross');
console.log(bob.getFullName());
console.log(bob instanceof Person);
console.log(Object.keys(bob).length);
console.log(bob.firstName);
console.log(bob.lastName);
*/



console.log(pairwise([1, 4, 2, 3, 0, 5], 7) );
console.log("should return 11");

console.log(pairwise([1, 3, 2, 4], 4));
console.log("should return 1");

});


function pairwise(arr, arg) {
    console.log("arr: " + arr); 
    console.log("arg: " + arg);
    var sum = 0;
    var tempArray = [];
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length; j++){
            if (tempArray.indexOf(i) !== -1){
                continue;
            }
            if (tempArray.indexOf(j) !== -1){
                continue;
            }
            if (i === j ){
                continue;
            }
            if (arr[i] + arr[j] === arg ){
                tempArray.push(i,j);
            }
        }
    }
    sum = tempArray.reduce(function (total, element){
        return total + element;
    },0);
  return (sum);
}
















function makeFriendlyDates(arr){
    var startDate = arr[0];
    var endDate   = arr[1];

    var monthArray = ["January",    "February",     "March",
                        "April",    "May",          "June",
                        "July",     "August",       "September",
                        "October",  "November",     "December"]
    var daySuffix  = ["st", "nd", "rd", "th" ];

    function getDayNumber(dayNumber){
        var dayArray = [dayNumber]; //Array.from(dayNumber);
        //console.log(dayArray);

        if((dayArray[0] == 1 ) &&( dayArray.length === 2 ) ){
            return (dayNumber + daySuffix[3]);
        }
        if(dayArray[dayArray.length -1] == 1 ){
            return (dayNumber + daySuffix[0]);
        }
        if(dayArray[dayArray.length -1] == 2 ){
            return (dayNumber + daySuffix[1]);
        }
        if(dayArray[dayArray.length -1] == 3 ){
            return (dayNumber + daySuffix[2]);
        }
        return (dayNumber + daySuffix[3]);
    }


    //["December 1st, 2016","February 3rd, 2018"]
     function dateObject (dateString){
        var dateStringArray = dateString.split("-");
        var year;
        var monthNumber;
        var dayNumber; 
        var month;
        var day;
        //console.log( dateStringArray);

        this.year            = Number.parseInt(dateStringArray[0]);
        this.monthNumber     = Number.parseInt(dateStringArray[1]);
        this.dayNumber       = Number.parseInt(dateStringArray[2]);
        //console.log(this.dayNumber);
        this.month           = monthArray[ ( this.monthNumber) -1 ];
        this.day             = getDayNumber( this.dayNumber );
        this.fullString      = this.month + " " + this.day + ", " + this.year;
    }

    var startDateObject  = new dateObject(startDate);
    var endDateObject    = new dateObject(endDate);

    var resultArray = [];
    var monthsElapsed = ( ((endDateObject.year - startDateObject.year)* 12 ) +
                        (endDateObject.monthNumber - startDateObject.monthNumber ));

    console.log("Months Elapsed:" + monthsElapsed);
    if(startDateObject.fullString === endDateObject.fullString ){
        resultArray.push(startDateObject.fullString);
        return resultArray;
    }


    if ((monthsElapsed > 12) ){
        resultArray.push(startDateObject.fullString);
    } else if ((monthsElapsed == 12) && (startDateObject.dayNumber == endDateObject.dayNumber ) ){
        resultArray.push(startDateObject.fullString);
    }   else if ((monthsElapsed == 12) && (endDateObject.dayNumber < startDateObject.dayNumber ) ){
        resultArray.push(startDateObject.fullString);
    } else if ( (( monthsElapsed ) < 12 ) && (endDateObject.year != startDateObject.year ) ) {
        resultArray.push(startDateObject.month + " " + startDateObject.day);
    } else if ( (( monthsElapsed ) < 12 ) && (( monthsElapsed ) > 0 )) {
        resultArray.push(startDateObject.fullString);        
    } else if((monthsElapsed < 12)  ){
        resultArray.push(startDateObject.month + " " + startDateObject.day);
    }



    if ((( monthsElapsed ) === 12) && (endDateObject.dayNumber >= startDateObject.dayNumber) ){
        resultArray.push(endDateObject.fullString );
    }else if ((( monthsElapsed ) === 12 ) && ( endDateObject.dayNumber < startDateObject.dayNumber ) ){
        resultArray.push( endDateObject.month + " " + endDateObject.day);
    } else if ( (( monthsElapsed ) < 12 ) && (( monthsElapsed ) > 0 )    ) {
        resultArray.push( endDateObject.month + " " + endDateObject.day);
    } else if (( monthsElapsed ) > 12 ){
        resultArray.push(endDateObject.fullString );
    } else if(startDateObject.day !== endDateObject.day) {
        resultArray.push( endDateObject.day);
    }

return resultArray ;
}













function permAlone(originalString) {
    stringArray = Array.from(originalString);
    if (stringArray.length === 1){
        return 1;
    }

    function steamrollArray(arr) {
    // I'm a steamroller, baby
        var total = [];
        function getValuesFromArray(value){
            if((Array.isArray(value) )){
                value.forEach(function (v){
                    getValuesFromArray( v );            
                });
            }else{
            total.push(value);
            }
        }
        arr.forEach(function (value){
            getValuesFromArray(value);
        });
    return total;
    }


    function insertCharIntoArray(char, arr){
        var resultArray = [];
        
            arr = Array.from(arr);
        
        for (var i = 0 ; i < arr.length+1; i ++){
            newArr = arr.slice() ;
            var tempArray = [];
            for(var j = 0 ; j < i; j++){
                tempArray.unshift(newArr.pop() );
            }
            tempArray.unshift(char);
            for(var k = j+1; k < arr.length + 1; k++){
                tempArray.unshift(newArr.pop() );
            }
            resultArray.push(tempArray.join("") );
        }
    return(resultArray);
    }


    var counter = 0;
        counter++;
    var newTempResult   = [];
    var tempResult      = [];
        newTempResult   = insertCharIntoArray(stringArray[counter], stringArray[0]);
        tempResult      = steamrollArray( newTempResult);

    while (counter < (stringArray.length -1) ){
        counter++;
        newTempResult = [];
            for (var i = 0; i < tempResult.length; i++){
                newTempResult.push( insertCharIntoArray(stringArray[counter], tempResult[i]));
            }
        tempResult      = steamrollArray( newTempResult);
    }


    var myResultArray = [];
    resultItem = [];
    var inARowRegex = /(.)(?=\1){1}/;
    steamrollArray(tempResult).forEach(function (resultItem){
    var containsDuplicatesInARow = true;
        containsDuplicatesInARow = (inARowRegex.test(resultItem) === true );
        if(containsDuplicatesInARow === false){
            
            myResultArray.push(resultItem);
        }
    } ) ;
	//console.log(myResultArray.length);
return myResultArray.length;
}


// Example inventory lists
/*var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];
*/

function updateInventory(curInv, newInv) {
    // All inventory must be accounted for or you're fired!
    console.log("Current Inventory");
    //console.log(curInv);
    console.log("New Inventory");
    //console.log(newInv);
    var totalInv = [];
    //console.log("Total Inventory");
    newInv.map(function(newItem){
        var newItemName = newItem[1];
        //console.log(newItemName);

        var currentInventoryItem = [];

        function getItemFromArrayByName ( arrayItem ){
            return arrayItem[1] === newItemName;
        };

        currentInventoryItem = curInv.find(getItemFromArrayByName);
        //console.log(newItem);
        //console.log(currentInventoryItem);
        var newTotalLine;
        if (currentInventoryItem){
            newTotalLine = [ (currentInventoryItem[0] + newItem[0]) , currentInventoryItem[1] ];            
        }else{
            newTotalLine = newItem;
        }
        //console.log(newTotalLine);

        totalInv.push(newTotalLine);
    },0 );

    curInv.map(function(currentItem){
        var currentItemName = currentItem[1];
        //console.log("current Item Name: " + currentItemName);
        function getItemFromArrayByName ( arrayItem ){
            return arrayItem[1] === currentItemName;
        };
        
        currentInventoryItemInNewInventory = totalInv.find(getItemFromArrayByName);
        if ((currentInventoryItemInNewInventory) === undefined) {
            totalInv.push(currentItem);
            //console.log("Current Inventory Item location in new Inventory:" + currentInventoryItemInNewInventory)
            //console.log(currentItem);
        }

    });

    function sortByName(a, b){
        if (a[1] < b[1]){
            return -1;
        }
        if (a[1] > b[1]){
            return 1;
        }
        return 0;
    }

    return totalInv.sort(sortByName);
}




function sym(args) {
  var argsArray = Array.from(arguments);
  var reduceResult = argsArray.reduce(function(result, current){
    var newArray = [];


    for(var i = 0 ; i< current.length; i++){
      var currentValue =  current[i];
      console.log("Current Value = " + currentValue);
      if((result.indexOf(currentValue) == -1 ) && (newArray.indexOf(currentValue) == -1 )) {
        newArray.push(currentValue);
      }
    }

    for(var j = 0; j < result.length;j++){
      var currentResultValue = result[j];
      console.log("Current Result Value = " + currentResultValue);
      if((current.indexOf(currentResultValue) == -1) && (newArray.indexOf(currentResultValue) == -1  ) ){
        console.log("New Array: "+ newArray);
        newArray.push(currentResultValue);
      }
    }

    console.log("newArray = "+ newArray);
    return (result = newArray);
  });

  return reduceResult.sort();
}





/*
function sym(args){
    var argsArray = Array.from(arguments);
    console.log(argsArray);
    var symDifferenceArray = [];
    var maxLength = 0 ; 
    argsArray.forEach(function(current){
        if(maxLength < argsArray.length ){
            maxLength = argsArray.length;
        }
    });
    console.log(maxLength);
    for(var i = 0; i < maxLength; i++ ){
        for(var j = 0; j < argsArray.length ; j++){
            var count = 0;
            var arrayItemToCheck = (argsArray[j][i]);
            if(arrayItemToCheck === undefined){
                continue;
            }
            console.log("array Item To Check: "+ arrayItemToCheck);
            for(var k = 0; k < argsArray.length ; k++ ){
                targetArrayItemToCheck = argsArray[k][i];
                if(targetArrayItemToCheck === undefined){
                    continue;
                }

                if(arrayItemToCheck === targetArrayItemToCheck){
                            count++;
                }
            }
            console.log("Count: " + count);
            if (count !== 2){
                console.log("CountAmount: " + count);
                if (symDifferenceArray.indexOf(arrayItemToCheck) == -1 ){
                    console.log("CountAmount: " + count);

                        symDifferenceArray.push(arrayItemToCheck);
                }
            }
        }
    } 
    console.log(symDifferenceArray.sort());
    return symDifferenceArray.sort();
}
*/





function onlyOnce(args) {
    function getFlatValues(arr,flatArguments){
        //console.log(arr);
        function flatten (value){
            //console.log(value);
            if(Array.isArray(value)){
                value.forEach(flatten);
            }else{
                flatArguments.push(value);
            }
            //console.log(flatArguments);
        }
        
        Array.from(arr).forEach(
            function(arrayValue){
                //console.log(arrayValue);
            flatten(arrayValue);
        });
    }

  

    //myArgs
    var total = [];
    var myArgs = [];
    var uniqueArray = [];
    //var flatArguments = [];
    var totalArray = [];
    Array.from(arguments).forEach(function(val){
        myArgs.push(val);
        total.push(getFlatValues(val,totalArray));
    });

    for (var i =0; i < totalArray.length; i++){
        var currentArrayElementRegex = RegExp (totalArray[i] ,"g");
        console.log(totalArray);
        var duplicateLocation = totalArray.indexOf(totalArray[i], i+1 );
        console.log("index of:" + totalArray[i] + " is " + totalArray.indexOf(totalArray[i], i+1 ) + "starting at "+ i )
        if (totalArray.indexOf(totalArray[i]) === totalArray.lastIndexOf(totalArray[i]) ){
            uniqueArray.push( totalArray[i] );
        }
    }

    console.log("total: ");
    console.log(totalArray);
    
    console.log("unique:");
    console.log(uniqueArray);
    return uniqueArray;
}





function telephoneCheck(str) {
  // Good luck!
    //555-555-5555
    //(555)555-5555
    //(555) 555-5555
    //555 555 5555
    //5555555555
    //1 555 555 5555


    //2 757 622 7382
    var isValid = false;
    var regex = RegExp (/^1 {0,1}[(]{0,1}\d{3}[)-]{0,1}[- ]{0,1}\d{3}[- ]{0,1}\d{4}$/g);
    if (regex.test(str)){
        if( /\(/.test(str) === /\)/.test(str) ){
            isValid = true;
        }
    }
  return isValid;


  //return true;
}


function addTogether() {
    var arrayArgs = Array.from(arguments);
    var x = arrayArgs[0];
    var y = arrayArgs[1] || null;
    console.log(typeof x);
    console.log(typeof y);
    function makeAdder(x){
        return function(y){
            if((typeof y) === 'object'){
                return;  
            }
            return x + y;
        };
    }
    var makeAdderX =    makeAdder(x);

    if( (typeof x) !== "number" ){
        return;    
    }else{

        if (y === null){
            return makeAdderX;
        }else if((typeof y) === 'number' ) {
            return  makeAdderX(y);
        }else{
            return;
        }
    }


}


function truthCheck(collection, pre) {
  // Is everyone being true?
  var isTrueForAll = true;
  //console.log(collection);
  collection.forEach(function( value){
     //console.log(value.sex);
     if (value.hasOwnProperty(pre) == false){
         isTrueForAll = false;
     }else{
        if ( Boolean(value[pre]) !=true){
            
            isTrueForAll = false;
        } 
     }
    //console.log( Boolean(value[pre]) );
  });

   //console.log(isTrueForAll);
  
  return isTrueForAll;
}


function binaryAgent(str) {
    binaryStringArray = str.split(" ");
    function getCharFromBinArrayItem(bin){
        binArray = Array.from(bin);
        charTotal = 0;
        binMulti  = 1;

        for (var i = 0 ; i < 8; i++ ){
            charTotal += (binArray.pop() * binMulti );
            binMulti *= 2;
        }
    return charTotal;
    }


    var result = "";
    binaryStringArray.forEach(
        function(binCharArray){
            var charCode = getCharFromBinArrayItem(binCharArray);
            var letter = String.fromCharCode(charCode);
            result = result.concat(letter);
        });
  return result;
}



//var testArr = ([1, {}, [3, [[4]]]]);
function steamrollArray(arr) {
  // I'm a steamroller, baby
    var total = [];
    function getValuesFromArray(value){
        if((Array.isArray(value) )){
        //    console.log("isArray");
        //    console.log(value);
            value.forEach(function (v){
                getValuesFromArray( v );            
            });
        }else{
        total.push(value);
        //    console.log(value);
        //return value;
        }
    }
    arr.forEach(function (value){
        getValuesFromArray(value);
    });
//    console.log(total);
  return total;
}
//steamrollArray(testArr);






function dropElements(arr, func) {
  // Drop them elements.
  var matchFound = false;
  var i = 0;
  while (matchFound === false){
      console.log(func(arr[i]));
      if(func(arr[i])===true){
          matchFound = true;
          break;
      }
    i++
  }
  var subArray = arr.splice(i,arr.length);
  console.log(subArray);
  return arr;
}



function smallestCommons(arr) {
    var min = Math.min( arr[0], arr[1]);
    var max = Math.max( arr[0], arr[1]);
    var numArray = [];
    var num   = min;
    while (num <= max){
        numArray.push(num);
        num++;
    }

    var counter = max;
    var isLowestCommonDenom = false;
    while (isLowestCommonDenom === false){
        
        var lowestCommonDenomCounter = 0;
        numArray.forEach(function(num){
            if((counter % num) === 0 ){
                lowestCommonDenomCounter++;
            }
            if (lowestCommonDenomCounter === numArray.length){
                isLowestCommonDenom = true;
                return counter;
            }
        });
        
        if(isLowestCommonDenom === true){
            return counter;
        }
    counter += (5);
    }
    return counter;
}






function sumPrimes(num) {
  var primes    = [2];
  var counter   = 2;
  while (counter <= num){
    var isNotPrimeCheck = false;
    primes.forEach(function(currentPrime){
        if ((counter % currentPrime) == 0){
            isNotPrimeCheck = true;
        }
    });
    if (isNotPrimeCheck === false ){
        primes.push(counter);
        //console.log(primes);
    }
    counter++;
  }

  var result = primes.reduce(function (total, current){
      return total + current;
  });
  console.log(result);

  return result;
}






function sumFibs(num) {
  function getFibonacciNumbersLessThanMax(max){
    var fibonacciSequence = [1,1];
    var newFibonacciNumber = 0;
    while (newFibonacciNumber <= max ){
        newFibonacciNumber = (fibonacciSequence[fibonacciSequence.length -2] + 
                                fibonacciSequence[fibonacciSequence.length -1]);
        fibonacciSequence.push(newFibonacciNumber);
    }
    return fibonacciSequence;
  };
    
    var fibonacciSequence   = getFibonacciNumbersLessThanMax(num);
    arrayLessThanMax        = fibonacciSequence.splice(0,(fibonacciSequence.length-1));
    var result              = arrayLessThanMax.reduce(function( total, current){
            if ((current % 2) == 1){
                total += current;
            }
        return (total);
    });

  return result;
}






function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
    //strLettersArray = 
    stringArray     = str.replace(/([A-Z])/g, " $1" )
                            .replace(/^ /, "")
                            .replace(/  /g," " )
                            .toLowerCase()
                            .split(/[ _]/);

    var newString   = stringArray.join("-")
                            .replace(/--/g, "-");

    console.log(newString);
  return newString;
}


function convertHTML(str) {
  // &colon;&rpar;
  var regexAnd          = /&/g;
  var htmlAnd           = '&amp';
  
  var regexLessThan     = /</g;
  var htmlLessThan      = '&lt';

  var regexGreaterThan  = />/g;
  var htmlGreaterThan   = '&gt';

  var regexQuote        = /"/g;
  var htmlQuote         = '&quot';

  str = str.replace(regexAnd,           htmlAnd );
  str = str.replace(regexLessThan,      htmlLessThan );
  str = str.replace(regexGreaterThan,   htmlGreaterThan);
  str = str.replace(regexQuote,         htmlQuote );

  console.log(str);


  return str;
}



function uniteUnique(arr){
    var argsArray = Array.from(arguments); 
    var resultsArray = [];

    argsArray.forEach(function(array){
        array.forEach(function(value){
            if (resultsArray.includes(value) == false ){
                resultsArray.push(value);
            }
        });
    });

    //console.log(resultsArray);
    return resultsArray;
}




/*
function uniteUniqueFailed(arr) {
    var argsArray = Array.from(arguments); 
    var resultsArray = [];
    for(var currentArrayIndex = 0; currentArrayIndex < argsArray.length; currentArrayIndex++){
        var currentArray = argsArray[currentArrayIndex];
        
        var arraysLeft = [];
        var arraysLeftCounter = 1;
         while (arraysLeftCounter < (argsArray.length - currentArrayIndex)){
          arraysLeft.push(argsArray[arraysLeftCounter] )
          arraysLeftCounter++;
         }
         
         console.log(arraysLeft);
        for (var i=0;i< currentArray.length; i++ ){
            currentValue = currentArray[i];
            var currentValueFound = false; 
            arraysLeft.reduce(function(finalValue, arrayToCheck) {
                if ((arrayToCheck.includes(currentValue)) == true){
                    //console.log("currentValueFound");
                    currentValueFound = true;
                } ;

            }, this);
            if (currentValueFound == false){
                resultsArray.push(currentValue);
            }

        }

    }

    console.log(resultsArray);
  return arr;
}
*/











function booWho(bool) {
  // What is the new fad diet for ghost developers? The Boolean.
  return bool.constructor(Boolean);
}

function fearNotLetter(str) {
    var firstCharCode = str.charCodeAt(0);
    var lastCharCode  = str.charCodeAt(str.length -1 );

    for (var currentCharCode = firstCharCode; currentCharCode < lastCharCode; currentCharCode++ ){
        var currentLetter = String.fromCharCode(currentCharCode);
        if (str.indexOf(currentLetter) == -1){
            var result = currentLetter;
        }
    }
    return result;
}






function pairElement(str) {
    var resultArray = [];
  var inputArray = Array.from(str);
  function getDNAPair(base){
    switch (base){
        case "A":
            return "T";
        case "T":
            return "A";
        case "G":
            return "C";
        case "C":
            return "G";
        default:
            break;
    }
  }

  for (var i = 0; i < inputArray.length; i++  ){
     var currentBase = inputArray[i];
     resultArray.push([currentBase, getDNAPair(currentBase) ] );

  }

  return resultArray;
}



/*
function translatePigLatin(str) {
    var newStr = "";
    var vowels = ["a","e","i","o","u" ];
    var isVowel = false;
    
    var firstVowelLocation = (str.length + 1) ;
    var ending  = "ay";
    var strFirstLetter = str.slice(0, 1);

    vowels.forEach(function(vowel) {
         var vowelLocation = str.indexOf(vowel);
         if ((vowelLocation > -1) && ( vowelLocation < firstVowelLocation ) ) {
             firstVowelLocation = vowelLocation ;
         }
    });

    var strFirstLetters;
    if (firstVowelLocation === 0 ){
         ending = "w".concat(ending);
         strFirstLetters = "";
    }else{
         strFirstLetters = str.slice(0, firstVowelLocation);
    }


    var strRemains = str.slice(firstVowelLocation, (str.length));
    newStr     = newStr.concat(strRemains, strFirstLetters, ending );
  return newStr;
}
*/


/*
function myReplace(str, before, after) {
    beforeFirstLetter = before.slice(0,1);
    afterFirstLetter  = after.slice(0,1);
    capitalise = (beforeFirstLetter.toUpperCase() == beforeFirstLetter );
  
    var newAfter = ""

    if (capitalise == true ){
        newAfter = afterFirstLetter.toUpperCase();
    }else{
        newAfter = afterFirstLetter;
    }
        newAfter = newAfter.concat(  after.slice(1, (after.length) ));

    var regex = before;
    str = str.replace(regex, newAfter );

//console.log( str );

  return str;
}
*/



/*
function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
    collection.map(function (item){
        var searchProperties = (Object.keys(source) );
        var i = 0;
        searchProperties.map(function (property){            
            if(item[property] == source[property]){
                i++;
                if (i == searchProperties.length){
                    arr.push(item);
                }
            }
        });
    });
  // Only change code above this line
  return arr;
}
*/


/*
// NOTE - This should be able to use the fall through of the case statements
//
function convertToRoman(num){
    var romanNum  = "";
    var romanNumArray = [];

    romanNum = romanNum.concat(romanNumsConvert(Math.floor(num / 1000), "M", "", "" ));
    num -= (Math.floor(num / 1000)* 1000);    
    romanNum = romanNum.concat(romanNumsConvert(Math.floor(num / 100 ), "C", "D", "M" ));
    num -= (Math.floor(num / 100)* 100);
    romanNum = romanNum.concat(romanNumsConvert(Math.floor(num / 10  ), "X", "L", "C" ));
    num -= (Math.floor(num / 10)* 10);    
    romanNum = romanNum.concat(romanNumsConvert(Math.floor(num / 1   ), "I", "V", "X" ));
    num -= (Math.floor(num / 1)*1);
    //console.log(num);
    var reg  = /,/g;
    romanNum = romanNum.replace(reg,"");
    console.log(romanNum);
  
    return romanNum ;
}

function romanNumsConvert(num, romanOne, romanFive, romanTen){
    var romanNum  = "";
    var romanNumArray = [];

    switch(num) { 
        case 9:
            romanNumArray.unshift(romanTen);
            romanNumArray.unshift(romanOne);
            break;
        case 8:
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanFive);
            break;        
        case 7:
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanFive);
            break;        
        case 6:
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanFive);
            break;
        case 5:
            romanNumArray.unshift(romanFive);
            break;
        case 4:
            romanNumArray.unshift(romanFive);
            romanNumArray.unshift(romanOne);
            break;
        case 3:
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            break;
        case 2:
            romanNumArray.unshift(romanOne);
            romanNumArray.unshift(romanOne);
            break;
        case 1:
            romanNumArray.unshift(romanOne);
            break;
        case 0:
            break;
        default:
            break;
    }
    
//    console.log(romanNumArray);
    
    romanNum = romanNum.concat(romanNumArray).replace(",","");
    return romanNum;
}

*/