// Visualize with force directed graph
// 
// Page 167 - Learning d3dotjs - Data Visualisation Second Generation
// https://bl.ocks.org/mbostock/3750558



$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {

    //let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    //let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    let url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

    $.getJSON(url, function(json) {
        console.log(json);

        let h = window.innerHeight * 0.6;
        let w = window.innerWidth  * 0.9;

        let margins = {top:     h*0.05,
                        left:   w*0.05,
                        bottom: h*0.10,
                        right:  w*0.05}

        //let legendElementWidth = margins.left * 4;

        
        let svg = d3.select("#graph")
                    .append("svg")
                    .attr("width",  w + margins.left +( margins.right * 2) )
                    .attr("height", h + margins.top  + margins.bottom)
                    .attr("style", 'background-color: teal');

        let link = svg.selectAll(".link");
        let node = svg.selectAll(".node");


        let nodes = json.nodes;
        let links = json.links;
        /*
        let nodes = [   {"name":"test" },
                        {"name":"test2" }
            ];

        let links = [{"source": 0, "target":1}]
        */

        let linkSize = 5;

        let force = d3.layout.force()
                    .nodes( nodes )
                    .links( links )
                    .charge( (linkSize * 5) * -1 )
                    .gravity(0.05)
                    .size([w, h])
                    .start();

            force.on("tick", tick);
            //force.linkDistance(w/2);
        
        
        link = link.data( links )
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("style", "stroke-width: 2; stroke:black;")
        
        node = node.data(nodes)
            .enter()
            .append("circle")
            //.append("div")
            .attr("class", "node")
            //.attr("style", "fill: white;")
            .attr("style", (line)=>{

                /**/
                let red   =  Math.floor(Math.random() * 250);
                let green =  0;
                let blue  =  Math.floor(Math.random() * 250);
                let colorString = red.toString().concat(", ")
                                        .concat(green)
                                        .concat(", ")
                                        .concat(blue);
                    //console.log(colorString);
                let color = 'fill: rgb('.concat(colorString).concat(')');
                //let color = "rgb(200,155,120)";
                //console.log(color);
                return (color) 
                /**/
                
                })
            .attr("r", linkSize);


        

            //.attr("style", "height: 5; width: 5; border-radius: 50%");

        /**/

        function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        }


        
    });
}