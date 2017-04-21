//ready to start on D3.JS
// Visualize Data with a Bar Chart

/*data from 
https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json
*/



$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    $.getJSON(url, function(json) {
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
        let masterData = json.data.map((line) =>{return line} );
        //json.data = json.data.filter((line, i) => { if (i <= 20) { return line } });
        console.log(json.data);

        let h = 400;
        let w = 800;
        let barPaddingWidth = 0;
        let yPadding = 30;
        let xPadding = 80;


        //let max = d3.max((json.data), (data) => (data[1]));
        //let heightModifier = (h / max);

        let formatDate = d3.time.format("%Y-%m-%d");
        let yearFormat = d3.time.format("%Y");
        let yearMonthFormat = d3.time.format("%Y %B")

        let xScale = d3.time.scale()
            .domain([   d3.min(json.data, (data) => { return (formatDate.parse(data[0])) }),
                        d3.max(json.data, (data) => { return (formatDate.parse(data[0])) })
            ])
            .range([xPadding, w]);



        let yScale = d3.scale.linear()
            .domain([   0,
                        d3.max(json.data, (data) => { return data[1] })])
            .range([h - yPadding, 20
            
            ]);


        let xAxis = d3.svg.axis();
        xAxis.scale(xScale);
        xAxis.ticks(d3.time.year, 10);
        xAxis.orient("bottom")
        xAxis.tickFormat(d3.time.format("%Y"));



        let yAxis = d3.svg.axis();
        yAxis.scale(yScale)
        yAxis.ticks(10)
        yAxis.orient("left")


        let graph = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        graph.selectAll("rect")
            .data(json.data)
            .enter()
            .append("rect")
            .attr("class", (line) => {
                let classString = "bar ".concat(formatDate.parse(line[0]))
                                        .concat(" ")
                                        .concat((line[1]))
                return classString
            })
            .attr("fill", "teal")
            .attr("x", (line, i) => {
                return i * ((w - (xPadding)) / json.data.length) + xPadding
            })
            .attr("y", (line) => {
                return yScale(line[1])
            })
            .attr("height", (line) => {
                return (h -yScale(line[1]) -yPadding  )
            })
            .attr("width", ((w - xPadding) / json.data.length) - barPaddingWidth)
            .on("mouseover", function(d){
                //for fill effects 
                /*d3.select(this)
                    .attr("fill", "orange");
                    console.log("Mouseover found");
                    console.log(d3.select(this));
                */

                /*
                d3.select(this)
                    .append("title")
                    .text( (line) => {return line} )
                */
                let thisDate = (formatDate.parse(d[0]));


                //console.log(this);
                //var xPosition = parseFloat(d3.select(this).attr("x")) ;
                var xPosition = parseFloat(d3.event.pageX)
                //var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
                var yPosition = parseFloat(d3.event.pageY +14)

                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px")
                  .select("#value")
                  .text(d[1]);

                d3.select("#tooltip")
                  .select("#dateValue")
                  .text(yearMonthFormat(thisDate) );

                d3.select("#tooltip").classed("hidden", false);

                /*
                graph.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "11px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .text(d);
                */
            })

            .on("mouseout", function(){
              /*
                d3.select(this)
                    .transition(9000)
                    .delay(500)
                    .attr("fill", "teal");
              */
                //d3.select("#tooltip").remove();
                d3.select("#tooltip").classed("hidden", true);
            })



        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (0) + ", " + (h - yPadding) + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (xPadding) + ", " +6 + ")")
            .call(yAxis);






        //json.data = masterData;


    });
}