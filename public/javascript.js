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


        //let max = d3.max((json), (line) => (line.Place));
        //let heightModifier = (h / max);

        let formatDate = d3.time.format("%Y-%m-%d");
        let yearFormat = d3.time.format("%Y");
        let yearMonthFormat = d3.time.format("%Y %B")

        let xScale = d3.scale.linear()
            .domain([   d3.min(json, (line) => { return line.Seconds/*(formatDate.parse(line.Seconds))*/ }),
                        d3.max(json, (line) => { return line.Seconds/*(formatDate.parse(line.Seconds))*/ })
            ])
            .range([xPadding, w]);



        let yScale = d3.scale.linear()
            .domain([   0,
                        d3.max(json, (line) => { return line.Place })])
            .range([h - yPadding, 20
            
            ]);


        let xAxis = d3.svg.axis();
        xAxis.scale(xScale);
        xAxis.ticks(10);
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
                console.log(line.Doping.length);
                let classString = "";
                if (line.Doping.length < 1){
                     classString = "clean ".concat((line.Seconds))
                                            .concat(" ")
                                            .concat((line.Place))
                }else{
                     classString = "doped ".concat((line.Seconds))
                                            .concat(" ")
                                            .concat((line.Place))
                }

                return classString
            })
            //.attr("fill", "teal")
            .attr("cx", (line, i) => {
                return xScale(line.Seconds) //i * ((w - (xPadding)) / json.length) + xPadding
            })
            .attr("cy", (line) => {
                return yScale(line.Place)
            })
            .attr("r", 5)
            /*
            .attr("height", (line) => {
                return (h -yScale(line.Place) -yPadding  )
            })
            .attr("width", ((w - xPadding) / json.length) - barPaddingWidth)
            */
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
                
                d3.select("#tooltip")
	                .select("#Doping")
                    .text(d.Doping);

                d3.select("#tooltip")
	                .select("#URL")
                    .text(d.URL);
                                

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
                //d3.select("#tooltip").classed("hidden", true);
            })



        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (0) + ", " + (h - yPadding) + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (xPadding) + ", " +0 + ")")
            .call(yAxis);






        //json = masterline;


    });
}