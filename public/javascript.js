// Visualize with force directed graph
// 
// Page 167 - Learning d3dotjs - Data Visualisation Second Generation
//
// http://bl.ocks.org/d3noob/5193723 << helpful for dots on map
// http://www.d3noob.org/2013/03/a-simple-d3js-map-explained.html  << original article for it


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


    //let url   = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";
    //let url   = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json";
    let url     = "https://d3js.org/world-50m.v1.json";
    //the geodata in a separate file and load it in using d3.json():
    /*
        d3.json(url, function(json) {
        svg.selectAll("path")
        .data(json.objects)
        .enter()
        .append("path")
        .attr("d", (o)=>{return o.countries});
        });
    */
    

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
        //if (error) throw error;
            let meteors = svg.selectAll("circle")
                .data(meteorites.features)
                .enter()
                .append("circle")
                .attr("cx", (d, i)=>{
                    //console.log(d);

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
                    //d3.select(this).classed("hidden", true);
                    d3.select("#tooltip").classed("hidden", true);
                });
        });

    });




    /*
    $.getJSON(url, function(json) {
        console.log(json);

        

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


          

        /*
        let link = svg.selectAll(".link");
        let node =  d3.select('#flags').selectAll(".node");

        
        let nodes = json.nodes;
        let links = json.links;

        let linkSize = 8 *(h / nodes.length );

        let force = d3.layout.force()
                    .nodes( nodes )
                    .links( links )
                    .charge( (linkSize  ) * -1 )
                    .gravity(0.05)
                    .size([w, h + 20 ])
                    .start();

        link = link.data( links )
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("style", "stroke-width: 2; stroke:black;");





        node = node.data(nodes)
            .enter()
            .append("img")
            .attr("class", (line,i ) => {
                let flagCode = "flag flag-".concat(line.code);
                return "node ".concat(flagCode);
            })
            .on("mouseover", function(d){
                d3.select(this)
                    
                let xPosition = parseFloat(d3.event.pageX)
                let yPosition = parseFloat(d3.event.pageY +14)

                d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px");

                d3.select("#tooltip")
                    .select("#Country")
                    .html(function(){
                        let wikiCountryName  = d.country.replace(/ /g,"_");
                        let wikiPage = `https://en.wikipedia.org/wiki/${wikiCountryName}`;
                        let html     = `<a href=${wikiPage}>${d.country}</a>`
                        return html;
                    })

                d3.select("#tooltip").classed("hidden", false); 
            });
  
        force.on("tick", tick);

        function tick() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });


            node.style('left',function(d){
                return (d.x -5 )+'px';
            }).style('top',function(d){
                return (d.y + 130 )+'px';
            });
        };
        */



        
    //});
}
