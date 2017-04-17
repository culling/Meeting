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


        json.data = [[1,1],
                      [2,3],
                      [3,5],
                      [4,10],
                      [5,5]]

        let h = 400;
        let w = 800;
        let paddingWidth = 1;

        let max = d3.max( (json.data), (data) => (data[1]) );
        console.log(max);

        let heightModifier = ( h / max) ;

        let xScale = d3.scale.linear()
                            .domain([0, d3.max(json.data, (data)=>{return data[0]} ) ])
                            .range( [0, w]);

        /*
        let yScale = d3.scale.linear()
                            .domain([0, d3.max(json.data, (data)=>{return data[1]} )])
                            .range( [0, h]);
        */

        let xAxis = d3.svg.axis();
            xAxis.scale(xScale);
            xAxis.ticks(json.data.length);
            xAxis.orient("bottom");



        let graph = d3.select("#graph")
                      .append("svg")
                      .attr("width", w )
                      .attr("height", h);

                    graph.selectAll("rect")
                      .data(json.data)
                      .enter()
                      .append("rect")
                      .attr("class", "bar")
                      .attr("x", (line, i)  => {
                        return  i * (w / json.data.length) })
                      .attr("y", (line)     => {
                        console.log((h - (line[1] * heightModifier ) -30 ) )
                        return (h - (line[1] * heightModifier )) -30 })
                      .attr("height", (line)=>{
                        return ( (line[1] * heightModifier ) ) })
                      .attr("width", (w / json.data.length ) -paddingWidth )


                    graph.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0, "+ (h - 30) +")")
                        .call(xAxis);


          /*
          .attr("width", function(data, i){
            return ((w / json.data.length) - paddingWidth )
          })
          .attr("height", function(line){
            return (line[1] * heightModifier );
          } );
          */

          



    } );
}










