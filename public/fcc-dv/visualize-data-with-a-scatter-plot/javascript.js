//ready to start on D3.JS
// Visualize line with a Bar Chart




$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {

    let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    $.getJSON(url, function(json) {

        let h = window.innerHeight * 0.6 ;
        let w = window.innerWidth  * 0.6;
        let barPaddingWidth = 0;
        let yPadding = 30;
        let xPadding = 80;

        let circleSize = 5;

        let formatTime  = d3.time.format("%M:%S");
        let minuteFormat =      d3.time.format("%M:%S");
        let yearMonthFormat =   d3.time.format("%Y %B");

        let maxTime     = d3.max((json), (line) => formatTime.parse(line.Time));
        let minTime     = d3.min((json), (line) => formatTime.parse(line.Time));
        let maxPlace    = d3.max((json), (line) => line.Place );



        let xScale = d3.scale.linear()
            .domain([   (d3.max(json, (line) => {
                return maxTime- formatTime.parse(line.Time) })*1.1 ),
                        d3.min(json, (line) => { 
                return maxTime- formatTime.parse(line.Time) })
            ])
            .range([xPadding, w -xPadding]);

        let yScale = d3.scale.linear()
            .domain([   (d3.max(json, (line) => {
                return line.Place }) *1.1 ),
                        d3.min(json, (line) => {
                return line.Place })])
            .range([h - yPadding, 20]);




        let xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat( function (line){
                return minuteFormat(d3.time.second(line))
            })
            .orient("bottom");

        let yAxis = d3.svg.axis()
            .scale(yScale)
            .ticks(10)
            .orient("left")




        let graph = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        graph.selectAll("circle")
            .data(json)
            .enter()
            .append("circle")
            .attr("class", (line) => {
                let classString = "";
                if (line.Doping.length < 1){
                     classString = "clean "
                }else{
                     classString = "doped "
                }
                return classString
            })
            .attr("cx", (line, i) => {
                return xScale( formatTime.parse(line.Time) - minTime );
            })
            .attr("cy", (line) => {
                return yScale( line.Place);
            })
            .attr("r", circleSize)
            .on("mouseover", function(d){
                d3.select(this)
                    .attr("r", circleSize * 3);
                var xPosition = parseFloat(d3.event.pageX)
                var yPosition = parseFloat(d3.event.pageY +14)

                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px")
                  .select("#value")
                  .text(d.Seconds);

                d3.select("#tooltip")
                  .select("#dateValue")
                  .text(d.Place );

                d3.select("#tooltip")
                  .select("#Name")
                  .text(d.Name);

                d3.select("#tooltip")
                  .select("#Year")
                  .text(d.Year);

                d3.select("#tooltip")
                  .select("#Place")
                  .text(d.Place);
                
                d3.select("#tooltip")
                  .select("#Time")
                  .text(d.Time);

                d3.select("#tooltip")
	                .select("#Nationality")
                    .text(d.Nationality);

                d3.select(".dopeStoryLink")
                    .remove();

                d3.select("#tooltip")
                    .select("#Doping")
                    .append("div")
                    .attr("class", "dopeStoryLink")
                    .html('<a href="'+d.URL +'" >'+ d.Doping+"</a>" )

                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function(){
                d3.select(this)
                    .attr("r", circleSize);
                d3.select("#tooltip")
                    .transition()
                    .delay(5000)
                    .attr("class", "hidden");
            })


        d3.select("#tooltip")
                .on("mouseover", function(d){
                d3.select(this).classed("hidden", false)
            })
                .on("mouseout", function (d){
                d3.select(this).classed("hidden", true)            
            });


        //Set the Axis on the chart
        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (0) + ", " + (h - yPadding) + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (xPadding) + ", " +6 + ")")
            .call(yAxis);

    });
}