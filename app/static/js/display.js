console.log("In the display file")


// let width = 1100 - margin.left - margin.right; // 1060
// let height = 420 - margin.top - margin.bottom; // 510
// let padding = 20;
// Set up Variables
let xdScale, ydScale, xdAxis, ydAxis, area;  //Empty, for now
let dataset = graphData

//Width and height
let m = {top: 30, right: 20, bottom: 20, left: 130}
let p = {top: 30, right: 30, bottom: 50, left: 50}

let w = 1100 - m.left - m.right;
let h = 420 - m.top - m.bottom;
// let padding = 20;

// For converting strings to Dates
let parsexTime = d3.timeParse("%Y-%m-%d");

//For converting Dates to strings
let formatxTime = d3.timeFormat("%Y");

// Convert  Dates
for (let i = 0; i < dataset.length; i++){
  dataset[i]['date'] = parsexTime(dataset[i]['date'])
} // end for

let stackx = d3.stack()
    .order(d3.stackOrderDescending);

// //Easy colors accessible via a 10-step ordinal scale
var colorsxd =  d3.scaleOrdinal(d3.schemeCategory10);

console.log("Here is the dataset")
console.log(dataset);

// STACKING

//get all the keys, but toss out 'date'
let keys = Object.keys(dataset[0]).slice(1);
console.log(keys);

//Tell stack function where to find the keys
stackx.keys(keys)
.value(function value(d, key) {
  return d[key].usage;
});

//Stack the data and log it out
console.log("here is the series")
let seriesx = stackx(dataset);
console.log(seriesx);

// MAKE THE CHART


// CODE FOR STACKED AREA

//Scale for stacked area
xdScale = d3.scaleTime()
.domain([
  d3.min(dataset, function(d) { return d.date; }),
  d3.max(dataset, function(d) { return d.date; })
])
.range([0, w])
// .range([p.left, w - p.right * 2]);

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
.range([h - p.bottom, p.top])
.nice();

//Define axes
xdAxis = d3.axisBottom()
.scale(xdScale)
.ticks(10)
.tickFormat(formatxTime);

//Define Y axis
ydAxis = d3.axisLeft()
.scale(ydScale)
.ticks(5);

//Define area generator
console.log("here is the area generator")
area = d3.area()
.x(function(d) { return xdScale(d.data.date); })

.y0(function(d) { return ydScale(d[0]); })

.y1(function(d) { return ydScale(d[1]); });

//Create SVG element
// var svg = d3.select("body")
// var svg = d3.select("aside")
// .append("svg")
// .attr("width", w)
// .attr("height", h);
var svg = d3.select("aside")
      .append("svg")
      .attr("width", w + m.left + m.right)
      .attr("height", h + m.top + m.bottom)
      .append("g")
      .attr("class", "maingroup")
      .attr("transform", "translate(" + m.left + "," + m.top + ")");


//Create areas
svg.selectAll("path")
.data(seriesx)
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
.attr("transform", "translate(0," + (h - p.bottom) + ")")
.call(xdAxis);

svg.append("g")
.attr("class", "axis y")
// .attr("transform", "translate(" + (w - p.left * 2) + ",0)")
.call(ydAxis);
