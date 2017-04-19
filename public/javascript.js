//ready to start on D3.JS
// Visualize Data with a Bar Chart

/*data from 
https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json
*/



$('document').ready(function() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    /*
      var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var formatCurrency = d3.format("$,.2f");
      $.getJSON(url).success(function(jsonData) {
        var data = jsonData.data;
      });
    console.log(data);
    */

    console.log("javascript Loaded");
    getJSON();

});

function getJSON() {
    var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    $.getJSON(url, function(json) {
        console.log(json);
        let formatCurrency = d3.format("$,.2f");

        //d3.select("graph").append("svg");
        /*
        d3.select("#graph").selectAll("p")
            .data(json.data)
            .enter()
            .append("p")
            .text(function (line){ return line[0]; } );
        */

        //.text(function (line){ return line[0]; } )

        /*
        d3.select("#graph").selectAll("div")
            .data(json.data)
            .enter()
            .append("div")
            .attr("class", "bar")
            .style("height", "30px")
            .style("width", function(line){
              console.log(line);
              return line[1] +"px";
            } );
        */

        /*
        json.data = [[1,1],
                      [2,3],
                      [3,5],
                      [4,10],
                      [5,5]];
        */

        //select first 10
        json.data = json.data.filter((line, i) => { if (i <= 40) { return line } });
        console.log(json.data);

        let h = 400;
        let w = 800;
        let barPaddingWidth = 1;
        let yPadding = 30;
        let xPadding = 50;


        let max = d3.max((json.data), (data) => (data[1]));


        let heightModifier = (h / max);

        let formatDate = d3.time.format("%Y-%m-%d");
        let yearFormat = d3.time.format("%Y");

        let xScale = d3.time.scale()
            .domain([   d3.min(json.data, (data) => { return (formatDate.parse(data[0])) }),
                        d3.max(json.data, (data) => { return (formatDate.parse(data[0])) })
            ])
            .range([xPadding, w]);



        let yScale = d3.scale.linear()
            .domain([   0,
                        d3.max(json.data, (data) => { return data[1] })])
            .range([h - yPadding, 0
            
            ]);


        let xAxis = d3.svg.axis();
        xAxis.scale(xScale);
        xAxis.ticks(d3.time.year, 1);
        xAxis.orient("bottom")
        xAxis.tickFormat(d3.time.format("%Y"));



        let yAxis = d3.svg.axis();
        yAxis.scale(yScale)
        yAxis.ticks(5)
        yAxis.orient("left")


        let graph = d3.select("#graph")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        graph.selectAll("rect")
            .data(json.data)
            .enter()
            .append("rect")
            .attr("class", (line) => {
                let classString = "bar ".concat(formatDate.parse(line[0]))
                                        .concat(" ")
                                        .concat((line[1]))
                return classString
            })
            .attr("x", (line, i) => {
                return i * ((w - (xPadding)) / json.data.length) + xPadding
            })
            .attr("y", (line) => {
                return yScale(line[1])
            })
            .attr("height", (line) => {
                return (h -yScale(line[1]) -yPadding  )
            })
            .attr("width", ((w - xPadding) / json.data.length) - barPaddingWidth)


        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (0) + ", " + (h - yPadding) + ")")
            .call(xAxis);

        graph.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + (xPadding) + ", " +0 + ")")
            .call(yAxis);






    });
}