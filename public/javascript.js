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
            
            /*
            svg.append("defs")
                .html(`
                    <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="120" width="120">
                        <image x="0" y="0" xlink:href="https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/flags.png"></image>
                    </pattern>
                    `);
            */

        let link = svg.selectAll(".link");
        let node = svg.selectAll(".node");


        let nodes = json.nodes;
        let links = json.links;


        let linkSize = 5;

        let force = d3.layout.force()
                    .nodes( nodes )
                    .links( links )
                    .charge( (linkSize * 5) * -1 )
                    .gravity(0.05)
                    .size([w, h])
                    .start();

            force.on("tick", tick);

        
        
        link = link.data( links )
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("style", "stroke-width: 2; stroke:black;")
        
        node = node.data(nodes)
            .enter()
            .append("img")
            .attr("class", (line,i ) => {
                let flagCode = "flag flag-".concat(line.code);
                return "node ".concat(flagCode);
            })
            .attr("width", 20)
            .attr("height", 20);

            //.html( '<p style="position: absolute;   display: inline-block; ">Test</p>' )
            /*
            .append("circle")
            //.append("div")
            .attr("class", (line,i ) => {
                let flagCode = "flag flag-".concat(line.code);
                return "node ".concat(flagCode);
            })*/

            /*
            .attr("style", (line)=>{
                let red   =  Math.floor(Math.random() * 250);
                let green =  0;
                let blue  =  Math.floor(Math.random() * 250);
                let colorString = red.toString().concat(", ")
                                        .concat(green)
                                        .concat(", ")
                                        .concat(blue);
                    //console.log(colorString);
                let color = 'fill: rgb('.concat(colorString).concat(')');
                //return (color) 
                
                let imgUrl = "https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/flags.png";
                //let fill = 'fill: url("' + imgUrl +'")';

                //background-position: -16px 0
                let fill = 'fill: url("#image")';
                return fill;
            })
            .attr("r", linkSize);
            */


        function tick() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });


        node.attr("style", function(d){  
                let ws = "left: ".concat( Math.round( d.x)).concat("; top: ").concat( Math.round(d.y)) ;
                    ws = ws.concat(';background: url("https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/flags.png") no-repeat')
                    ws = ws.concat(';background-position: -16px 0;')        

                    //background:url("https://www.cs.mun.ca/~h65ped/Public/country%20data%20for%20force%20directed%20graph/flags.png") no-repeat
                return ws;
        });

        };

        /*
        node.style('left', d => (d.x - 8) + "px")
			.style('top', d => (d.y - 5) + "px");
        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        }*/


        
    });
}