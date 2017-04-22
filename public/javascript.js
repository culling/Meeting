
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
        let w = window.innerWidth  * 0.6;
        let barPaddingWidth = 1;
        let yPadding = 30;
        let xPadding = 80;
            /*
            .on("mouseover", function(d){
                d3.select(this)
                    .attr("r", circleSize * 3);
                var xPosition = parseFloat(d3.event.pageX)
                var yPosition = parseFloat(d3.event.pageY +14)

                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px");

                d3.select("#tooltip")
                  .select("#Name")
                  .text(d.Name);

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
            */

        

        let getMonth = d3.time.format("%m");
        let getMonthName = d3.time.format("%B");
        console.log(json);
        console.log(json.monthlyVariance[0].month);

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
        let margins = {top: 20,
                        left: 20,
                        bottom: 20,
                        right: 20}

        let svg = d3.select("#graph")
                    .append("svg")
                    .attr("width",  w + margins.left + margins.right )
                    .attr("height", h + margins.top  + margins.bottom)
                    .attr("style", 'background-color: teal');

            svg.selectAll(".monthLabel")
                .data(months)
                .enter()
                .append("text")
                .text( (month)=>{return month} )
                .attr("x", margins.left)
                .attr("y", (month, i )=>{return (i * (h/months.length)) + margins.top } )
                .attr("class", ".monthLabel");


            /*.selectAll("p")
            .data(json.monthlyVariance)
            .enter()
            */
            /*.append("p")
            .text( (line) =>{
                let d3Month   = getMonth.parse( line.month.toString() );
                return '"'.concat( getMonthName( (d3Month))).concat('",') ;
            })
            */


    });
}