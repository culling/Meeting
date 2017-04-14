//ready to start on D3.JS
// Visualize Data with a Bar Chart

/*data from 
https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json
*/



$('document').ready(function() {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/*
  var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var formatCurrency = d3.format("$,.2f");
  $.getJSON(url).success(function(jsonData) {
    var data = jsonData.data;
  });
console.log(data);
*/

    console.log("javascript Loaded");
    getJSON();

});

function getJSON(){
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    $.getJSON(url, function(json){
        console.log(json);
        let formatCurrency = d3.format("$,.2f");


        let data = [1,2,3,4,5]
        //d3.select("graph").append("svg");
        d3.select("#graph").selectAll("p")
            .data(json.data)
            .enter()
            .append("p")
            .text(function (line){ return line[0]; } )
            //.text(function (line){ return line[0]; } )


    } );
}










