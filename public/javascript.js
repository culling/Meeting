
// Visualize line with a Heat Map
//http://bl.ocks.org/tjdecke/5558084



$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {

    //let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    $.getJSON(url, function(json) {

        let h = window.innerHeight * 0.6;
        let w = window.innerWidth  * 0.9;

        let getMonth =      d3.time.format("%m");
        let getMonthName =  d3.time.format("%B");
        let yearFormat = d3.time.format("%Y");


        //console.log(json);
        //console.log(json.monthlyVariance[0].month);
        let years = Math.ceil(json.monthlyVariance.length /12);
        //console.log(years);
        let rectHeight = ((h /12)*1.1 );

        let months = [  "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"]

        let margins = {top:     h*0.05,
                        left:   w*0.05,
                        bottom: h*0.10,
                        right:  w*0.05}

        let legendElementWidth = margins.left * 4;


        let xScale = d3.time.scale()
            .domain([   d3.min(json.monthlyVariance, (data) => { return (yearFormat.parse(data.year.toString() )) }),
                        d3.max(json.monthlyVariance, (data) => { return (yearFormat.parse(data.year.toString() )) })
            ])
            .range([0, (w - ( legendElementWidth  )) ]);

        
        let xAxis = d3.svg.axis();
            xAxis.scale(xScale);
            xAxis.ticks(d3.time.year, 20);
            xAxis.orient("bottom")
            xAxis.tickFormat(d3.time.format("%Y"));




        let svg = d3.select("#graph")
                    .append("svg")
                    .attr("width",  w + margins.left +( margins.right * 2) )
                    .attr("height", h + margins.top  + margins.bottom)
                    .attr("style", 'background-color: teal');

            svg.selectAll(".monthLabel")
                .data(months)
                .enter()
                .append("text")
                .text( (month)          =>{return month} )
                .attr("x", margins.left)
                .attr("y", (month, i )  =>{return ( (i%12) * (h/months.length)) + (margins.top*2) })
                .attr("class", "monthLabel");


            let blocks = svg.selectAll(".year")
                .data(json.monthlyVariance);


            blocks.enter()
                .append("rect")
                .attr("x", (line,  i )=>{return legendElementWidth + (Math.floor(i/12) * ( ( (w - legendElementWidth)*(1/years) /*-(legendElementWidth + (margins.right *15) ) ) / (12*12*/)  ) ) })
                .attr("y", (month, i )=>{return ( (i%12) * (h/months.length)) + margins.top })
                .attr("class", "year")
                .attr("rx", 4)
                .attr("ry", 4)
                .attr("width", (w - legendElementWidth)*(1/years))
                .attr("height", rectHeight )
                .attr("style", (line)=>{
                    let red   = 120 - Math.floor(line.variance * 50);
                    let green = 0;
                    let blue  = 120 + Math.floor(line.variance * 50);
                    let colorString = red.toString().concat(", ")
                                         .concat(green)
                                         .concat(", ")
                                         .concat(blue);
                        //console.log(colorString);
                    let color = 'fill: rgb('.concat(colorString).concat(')');
                    //let color = "rgb(200,155,120)";
                    //console.log(color);
                    return (color) })
            
            .on("mouseover", function(d){
                d3.select(this)
                    .attr("h", rectHeight * 3);
                let xPosition = parseFloat(d3.event.pageX)
                let yPosition = parseFloat(d3.event.pageY +14)

                let d3Month   = getMonth.parse( d.month.toString() );
                let d3MonthName =  ( getMonthName( (d3Month))) ;
        
                let absoluteTemp = json.baseTemperature + d.variance;


                let formatTemp = d3.format(".3n");

                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px");

                d3.select("#tooltip")
                  .select("#Year")
                  .text(d.year);

                d3.select("#tooltip")
                  .select("#Month")
                  .text( d3MonthName );

                d3.select("#tooltip")
                    .select("#Temprature")
                    .text( formatTemp(absoluteTemp));

                d3.select("#tooltip")
                    .select("#variance")
                    .text(d.variance);


                d3.select("#tooltip").classed("hidden", false);
                
            })
            /*
            .on("mouseout", function(){
                d3.select(this)
                    .attr("r", circleSize);
                d3.select("#tooltip")
                    .transition()
                    .delay(5000)
                    .attr("class", "hidden");
            })
            */

            
        d3.select("#tooltip")
                .on("mouseover", function(d){
                d3.select(this).classed("hidden", false)
            })
                .on("mouseout", function (d){
                d3.select(this).classed("hidden", true)            
            });
            

        

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + legendElementWidth + ", " + (h + (margins.bottom/2) ) + ")")
            .call(xAxis);

    });
}