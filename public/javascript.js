// Visualize with force directed graph
// 
// Page 167 - Learning d3dotjs - Data Visualisation Second Generation
//



$('document').ready(function() {
    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {

    //let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    //let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    let url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

    $.getJSON(url, function(json) {

        let h = window.innerHeight * 0.6;
        let w = window.innerWidth  * 0.9;

        let margins = {top:     h*0.05,
                        left:   w*0.05,
                        bottom: h*0.10,
                        right:  w*0.05}

        let legendElementWidth = margins.left * 4;


        let svg = d3.select("#graph")
                    .append("svg")
                    .attr("width",  w + margins.left +( margins.right * 2) )
                    .attr("height", h + margins.top  + margins.bottom)
                    .attr("style", 'background-color: teal');

            
        d3.select("#tooltip")
                .on("mouseover", function(d){
                d3.select(this).classed("hidden", false)
            })
                .on("mouseout", function (d){
                d3.select(this).classed("hidden", true)            
            });
            

        
    });
}