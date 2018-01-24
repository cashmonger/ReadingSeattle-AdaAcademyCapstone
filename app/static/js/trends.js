console.log("in the js file");
console.log(trendData);

// Set up Variables

let trendDataset = trendData
console.log("here is the trendDataset")
console.log(trendDataset)
//Width and height

let margin = {top: 30, right: 20, bottom: 20, left: 60}
let padding = {top: 30, right: 30, bottom: 50, left: 50}

let width = 1100 - margin.left - margin.right; // 1060
let height = 420 - margin.top - margin.bottom; // 510
// let padding = 20;


// For converting strings to Dates
let parseTime = d3.timeParse("%Y");
//For converting Dates to strings
let formatTime = d3.timeFormat("%Y");

// Convert  Dates
for (let i = 0; i < trendDataset.length; i++){
  trendDataset[i]['year'] = parseTime(trendDataset[i]['year'])
} // end for

// Set up Stack Method
// Keys are the categories we want to add to our stack
let stack = d3.stack()
  .keys(['BOOK', 'EBOOK', 'AUDIOBOOK', 'OTHER'])
  .order(d3.stackOrderDescending);

let series = stack(trendDataset);
console.log('series: ');
console.log(series);
//Easy colors accessible via a 10-step ordinal scale
let colors = d3.scaleOrdinal(d3.schemeCategory20);

//Set up scales
var xtScale = d3.scaleBand()
  .domain(d3.range(trendDataset.length))
  .range([0, width]) //
  .paddingInner(0.05);

var yScale = d3.scaleLinear()
  .domain([0,
    d3.max(trendDataset, function(d) {
      return d.BOOK + d.EBOOK + d.AUDIOBOOK + d.OTHER + 10;
    })
  ])
  .range([height - padding.bottom, padding.top]);

//Define axes
let xAxisScale = d3.scaleTime()
.domain([
  d3.min(trendDataset, function(d) { return d.year; } ),
  d3.max(trendDataset, function(d) { return d.year; } )
  //
  // d3.min(trendDataset, function(d) { return d.year; }),
  // d3.max(trendDataset, function(d) { return d.year; })
])
.range( [0, width] );

for (let i = 0; i < trendDataset.length; i++){
  trendDataset[i]['year'] = parseTime(trendDataset[i]['year'])
} // end for

//
let	xAxis = d3.axisBottom()
            .scale(xAxisScale)
            .ticks(10)
            .tickFormat(formatTime);

// Define Y axis
let yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);

console.log("Creating SVG")
// Create an svg as a G element that translates the origin to the top left corner of the chart area
var svg = d3.select("aside")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("class", "maingroup")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


console.log("Creating Groups")
// Add a group for each row of data
var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function(d, i) {
          return colors(i);
    });
console.log("Creating Rectangles")
// Add a rectangle for each data value
var rects = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xtScale(i);
    })
    .attr("y", function(d) {
      return yScale(d[1]); //0 is baseline values
    })
    .attr("height", function(d) {
      return yScale(d[0]) - yScale(d[1]); //1 is topline value
    })
    .attr("width", xtScale.bandwidth())
    .on("mouseover", function() {
      d3.select(this)
        .attr("fill", "orange");
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .attr("fill", "rgb(0, 0, " + (d * 10) + ")");
    });
console.log("Appending axes")

//Create axes
svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0," + (height - padding.bottom) + ")")
.call(xAxis);

svg.append("g")
.attr("class", "axis y")
// .attr("transform", "translate(" + (w - padding * 2) + ",0)")
.call(yAxis);
