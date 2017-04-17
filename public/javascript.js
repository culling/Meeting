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

        /*
        json.data = [[1,1],
                      [2,3],
                      [3,5],
                      [4,10],
                      [5,5]];
        */

        //select first 10
        json.data = json.data.filter((line, i ) => { if(i <= 10){return line} } );


        let h = 400;
        let w = 800;
        let barPaddingWidth = 1;
        let bottomPaddingHeight = 30;
        let sidePaddingWidth = 50;


        let max = d3.max( (json.data), (data) => (data[1]) );
        console.log(max);

        let heightModifier = ( h / max) ;

        let xScale = d3.scale.linear()
                            .domain([0, d3.max(json.data, (data)=>{return data[0]} ) ])
                            .range( [0, w]);


        let yScale = d3.scale.linear()
                            .domain([0, d3.max(json.data, (data)=>{return data[1]} )])
                            .range( [0, h]);


        let xAxis = d3.svg.axis();
            xAxis.scale(xScale);
            xAxis.ticks(json.data.length);
            xAxis.orient("bottom");

        let yAxis = d3.svg.axis();
            yAxis.scale(yScale)
            yAxis.ticks(5)
            yAxis.orient("left")


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
                        console.log((h - (line[1] * heightModifier ) - bottomPaddingHeight ) )
                        return (h - (line[1] * heightModifier )) - bottomPaddingHeight })
                      .attr("height", (line)=>{
                        return ( (line[1] * heightModifier ) ) })
                      .attr("width", (w / json.data.length ) -barPaddingWidth )


                    graph.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(0, "+ (h - bottomPaddingHeight) +")")
                        .call(xAxis);

                    graph.append("g")
                        .attr("class", "axis")
                        .attr("transform", "translate(" + sidePaddingWidth + ", 0)" )
                        .call(yAxis);


          /*
          .attr("width", function(data, i){
            return ((w / json.data.length) - barPaddingWidth )
          })
          .attr("height", function(line){
            return (line[1] * heightModifier );
          } );
          */

          



    } );
}










