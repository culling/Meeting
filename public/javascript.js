//ready to start on D3.JS
// Visualize line with a Bar Chart




$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {

    let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    $.getJSON(url, function(json) {
        console.log(json);
        let formatCurrency = d3.format("$,.2f");

        //d3.select("graph").append("svg");
        /*
        d3.select("#graph").selectAll("p")
            .data(json)
            .enter()
            .append("p")
            .text(function (line){ return line.Seconds; } );
        */

        //.text(function (line){ return line.Seconds; } )

        /*
        d3.select("#graph").selectAll("div")
            .data(json)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", "30px")
            .style("width", function(line){
              console.log(line);
              return line.Place +"px";
            } );
        */

        /*
        json = [[1,1],
                      [2,3],
                      [3,5],
                      [4,10],
                      [5,5]];
        */

        //select first 10
        let masterline = json.map((line) =>{return line} );
        //json = json.filter((line, i) => { if (i <= 20) { return line } });
        console.log(json);

        let h = 400;
        let w = 800;
        let barPaddingWidth = 0;
        let yPadding = 30;
        let xPadding = 80;

        let circleSize = 5;


        let formatDate  = d3.time.format("%Y-%m-%d");
        let formatTime  = d3.time.format("%M:%S");

        let maxTime     = d3.max((json), (line) => formatTime.parse(line.Time));
        let minTime     = d3.min((json), (line) => formatTime.parse(line.Time));
        let maxPlace    = d3.max((json), (line) => line.Place );
        //let heightModifier = (h / max);



        let yearFormat =        d3.time.format("%Y");
        let minuteFormat =      d3.time.format("%M:%S");
        let yearMonthFormat =   d3.time.format("%Y %B");

        let xScale = d3.scale.linear()
            .domain([   
            d3.max(json, (line) => {
                console.log(maxTime);
                return maxTime- formatTime.parse(line.Time) })*1.1 ,
            d3.min(json, (line) => { 
                return maxTime- formatTime.parse(line.Time) })
            ])
            .range([xPadding, w -xPadding]);



        let yScale = d3.scale.linear()
            .domain([   (d3.max(json, (line) => { return line.Place }) *1.1 ),
                        d3.min(json, (line) => { return line.Place })])
            .range([h - yPadding,
                20]);


        let xAxis = d3.svg.axis();
            xAxis.scale(xScale);
        
        xAxis.tickFormat( function (line){
            return minuteFormat(d3.time.second(line))
        } );
        
        xAxis.orient("bottom");



        let yAxis = d3.svg.axis();
        yAxis.scale(yScale)
        yAxis.ticks(10)
        yAxis.orient("left")


        let graph = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        graph.selectAll("circle")
            .data(json)
            .enter()
            .append("circle")
            .attr("class", (line) => {
                //console.log(line.Doping.length);
                let classString = "";
                if (line.Doping.length < 1){
                     classString = "clean "
                }else{
                     classString = "doped "
                }

                return classString
            })
            //.attr("fill", "teal")
            .attr("cx", (line, i) => {
                return xScale( formatTime.parse(line.Time) - minTime ) //i * ((w - (xPadding)) / json.length) + xPadding
            })
            .attr("cy", (line) => {
                return yScale( line.Place)
            })
            .attr("r", circleSize)
            /*
            .attr("height", (line) => {
                return (h -yScale(line.Place) -yPadding  )
            })
            .attr("width", ((w - xPadding) / json.length) - barPaddingWidth)
            */
            .on("mouseover", function(d){
                //for fill effects 
                d3.select(this)
                    .attr("r", circleSize * 3);
                    //console.log("Mouseover found");
                    //console.log(d3.select(this));
                

                /*
                d3.select(this)
                    .append("title")
                    .text( (line) => {return line} )
                */
                //let thisDate = (formatDate.parse(d[0]));


                //console.log(this);
                //var xPosition = parseFloat(d3.select(this).attr("x")) ;
                var xPosition = parseFloat(d3.event.pageX)
                //var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
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
                    .delay(3000)
                    .attr("class", "hidden");
              

                //.remove();
                //d3.select("#tooltip").classed("hidden", true);
            })

        let tooltip = d3.select("#tooltip");
            tooltip.on("mouseover", function(d){
                //for fill effects 
                d3.select(this).classed("hidden", false)
            });
            tooltip.on("mouseout", function (d){
                d3.select(this).classed("hidden", true)            
            });



        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (0) + ", " + (h - yPadding) + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (xPadding) + ", " +6 + ")")
            .call(yAxis);






        //json = masterline;


    });
}