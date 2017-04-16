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

        //d3.select("graph").append("svg");
        /*
        d3.select("#graph").selectAll("p")
            .data(json.data)
            .enter()
            .append("p")
            .text(function (line){ return line[0]; } );
        */
            
        //.text(function (line){ return line[0]; } )

        /*
        d3.select("#graph").selectAll("div")
            .data(json.data)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", "30px")
            .style("width", function(line){
              console.log(line);
              return line[1] +"px";
            } );
        */

        let data = [1,2,3,4];

        let h = 100;
        let w = 400;
        let paddingWidth = 1;

        d3.select("#graph").selectAll("rect")
          .data(json.data)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(data, i) {
            return i * (w / json.data.length);
            })
          .attr("y", 0 )
          .attr("width", function(data, i){
            return ((w / json.data.length) - paddingWidth )
          })
          .attr("height", function(line){
            return (line[1] /100);
          } );


          



    } );
}










