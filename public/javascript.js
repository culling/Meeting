// Map Data Across the Globe


$('document').ready(function() {
    console.log("javascript Loaded");
    drawGraph();
});



function drawGraph() {

        let yearFormat =   d3.time.format("%Y");

        let h = window.innerHeight * 0.6;
        let w = window.innerWidth  * 0.9;

        let margins = {top:     h*0.05,
                        left:   w*0.05,
                        bottom: h*0.10,
                        right:  w*0.05}

        
        let svg = d3.select("#graph")
                    .append("svg")
                    .attr("width",  w + margins.left +( margins.right * 2) )
                    .attr("height", h + margins.top  + margins.bottom)
                    .attr("style", 'background-color: teal');



    let url     = "https://d3js.org/world-50m.v1.json";

    let projection = d3.geo.patterson()
        .scale(153)
        .translate([w / 2, h / 2])
        .precision(0.1);

    let path = d3.geo.path()
        .projection(projection);


    d3.json("https://d3js.org/world-50m.v1.json", (world)=>{
      //if (error) throw error;
    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);
    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);

        // Plot the meteors
        d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json", (meteorites)=>{
        
            let meteors = svg.selectAll("circle")
                .data(meteorites.features)
                .enter()
                .append("circle")
                .attr("cx", (d, i)=>{

                    if (d.geometry != null){
                    return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
                    }else {
                        return 1;
                    }
                })
                .attr("cy", (d, i)=>{
                    if (d.geometry != null){
                        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
                    }else{
                        return 1;
                    }
                
                })
                .attr("r", (d)=> {
                        return 3+ (Math.sqrt(d.properties.mass) / (h/2) )
                    })
                .attr("class", "meteor")
                .on("mouseover", function(d){
                    d3.select(this)
                        .attr("r", (3+ (Math.sqrt(d.properties.mass) / (h/2) * 3 ))) ;
                    var xPosition = parseFloat(d3.event.pageX)
                    var yPosition = parseFloat(d3.event.pageY +14)

                    d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px");

                    d3.select("#tooltip")
                    .select("#name")
                    .text(d.properties.name );

                    d3.select("#tooltip")
                    .select("#mass")
                    .text(d.properties.mass);

                    d3.select("#tooltip")
                    .select("#year")
                    .text(()=>{
                        let thisDate = new Date (d.properties.year); 
                        return thisDate.getFullYear() ;
                    }  );

                    d3.select("#tooltip")
                    .select("#class")
                    .text(d.properties.recclass);

                    d3.select("#tooltip")
                    .select("#lat")
                    .text(d.properties.reclat);

                    d3.select("#tooltip")
                    .select("#lon")
                    .text(d.properties.reclong);




                    d3.select("#tooltip").classed("hidden", false);
                })
                .on("mouseout", function (d){
                     d3.select(this)
                        .attr("r", (3+ (Math.sqrt(d.properties.mass) / (h/2)))) ;
                    d3.select("#tooltip").classed("hidden", true);
                });
        });

    });

}
