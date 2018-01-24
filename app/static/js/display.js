console.log("In the js file")

// Set up Variables
let xdScale, ydScale, xdAxis, ydAxis, area;  //Empty, for now
let dataset = graphData

//Width and height
let margin = {top: 20, right: 10, bottom: 20, left: 10}
let w = 1000 - margin.left - margin.right;
let h = 300 - margin.top - margin.bottom;
let padding = 20;

// For converting strings to Dates
let parseTime = d3.timeParse("%Y-%m-%d");

//For converting Dates to strings
let formatTime = d3.timeFormat("%Y");

// Convert  Dates
for (let i = 0; i < dataset.length; i++){
  dataset[i]['date'] = parseTime(dataset[i]['date'])
} // end for

let stack = d3.stack()
    .order(d3.stackOrderDescending);

// //Easy colors accessible via a 10-step ordinal scale
var colors =  d3.scaleOrdinal(d3.schemeCategory10);

console.log("Here is the dataset")
console.log(dataset);

// STACKING

//get all the keys, but toss out 'date'
let keys = Object.keys(dataset[0]).slice(1);
console.log(keys);

//Tell stack function where to find the keys
stack.keys(keys)
.value(function value(d, key) {
  return d[key].usage;
});

//Stack the data and log it out
console.log("here is the series")
let series = stack(dataset);
console.log(series);

// MAKE THE CHART


// CODE FOR STACKED AREA

//Scale for stacked area
xdScale = d3.scaleTime()
.domain([
  d3.min(dataset, function(d) { return d.date; }),
  d3.max(dataset, function(d) { return d.date; })
])
.range([padding, w - padding * 2]);

ydScale = d3.scaleLinear()
.domain([
  0,
  d3.max(dataset, function(d) {
    var sum = 0;

    //Loops once for each row, to calculate
    //the total (sum) of sales of all vehicles
    for (var i = 0; i < keys.length; i++) {
      sum += d[keys[i]].usage;
    };

    return sum;
  })
])
.range([h - padding, padding / 2])
.nice();

//Define axes
xdAxis = d3.axisBottom()
.scale(xScale)
.ticks(10)
.tickFormat(formatTime);

//Define Y axis
ydAxis = d3.axisRight()
.scale(yScale)
.ticks(5);

//Define area generator
console.log("here is the area generator")
area = d3.area()
.x(function(d) { return xdScale(d.data.date); })

.y0(function(d) { return ydScale(d[0]); })

.y1(function(d) { return ydScale(d[1]); });

//Create SVG element
// var svg = d3.select("body")
var svg = d3.select("aside")
.append("svg")
.attr("width", w)
.attr("height", h);



//Create areas
svg.selectAll("path")
.data(series)
.enter()
.append("path")
.attr("class", "area")
.attr("d", area)
.attr("fill", function(d, i) {
  return d3.schemeCategory20[i];
})
.append("title")  //Make tooltip
.text(function(d) {
  return d.key;
});

//Create axes
svg.append("g")
.attr("class", "axis x")
.attr("transform", "translate(0," + (h - padding) + ")")
.call(xdAxis);

svg.append("g")
.attr("class", "axis y")
.attr("transform", "translate(" + (w - padding * 2) + ",0)")
.call(ydAxis);
