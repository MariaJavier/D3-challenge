var svgWidth = 790;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 120
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrapper, append an SVG group that will hold our chart and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(data) {

// Step 1: Parse Data / Cast as numbers
  data.forEach(function(stats) {
    stats.poverty = +stats.poverty;
    stats.healthcare = +stats.healthcare;
    stats.age = +stats.age;
    stats.smokes = +stats.smokes;
    stats.income = +stats.income;
    stats.obesity = +stats.obesity
    });

    // //////////////////////// INSERTED CODE ////////////////

    // function xTextRefresh() {
    //   xText.attr(
    //     "transform",
    //     "translate(" +
    //       ((width - labelArea) / 2 + labelArea) +
    //       ", " +
    //       (height - margin - tPadBot) +
    //       ")"
    //   );
    // }
    // xTextRefresh();
    

  // Step 2: Scale functions for POVERTY & HEALTHCARE:
  var xScale = d3.scaleLinear()
    // .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
    .domain([8.5, d3.max(data, d => d.poverty)])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([3, d3.max(data, d => d.healthcare)])
    .range([height, 0]);

    // // // Step 2: Scale functions for AGE & SMOKES
    // var xScale = d3.scaleLinear()
    //   .domain([d3.min(data, d => d.age), d3.max(data, d => d.age)])
    // // .domain([8.5, d3.max(data, d => d.poverty)])
    //   .range([0, width]);

    // var yScale = d3.scaleLinear()
    //   .domain([3, d3.max(smokes, d => d.smokes)])
    //   .range([height, 0]);

    // // // Step 2: Scale functions for INCOME & OBESITY
    // var xScale = d3.scaleLinear()
    //   .domain([d3.min(data, d => d.income), d3.max(data, d => d.income)])
    // // .domain([8.5, d3.max(data, d => d.poverty)])
    //   .range([0, width]);

    // var yScale = d3.scaleLinear()
    //   .domain([3, d3.max(obesity, d => d.obesity)])
    //   .range([height, 0]);

    // Step 3: Create axis functions
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

    // Step 4: Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    //.attr("cx", d => xScale(d.poverty))
    //.attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", "0.5");

    // Step 5: Create Circles for 

    // Step 6: Initialize tool tip
    // ==============================
  var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
      return (`${d.abbr}<br>Healthcare: ${d.healthcare}<br>Poverty: ${d.poverty}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
  chartGroup.call(toolTip);

    // // Step 8: Create event listeners to display and hide the tooltip
    // // ==============================
  circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
   })
      // onmouseout event
    .on("mouseout", function(data, index) {
      toolTip.hide(data);
      });

// CREATE AXES LABELS

  // First X Axes Label: 
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

  // First Y Axes Label: In Poverty
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "3em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  // Second X Axes Label: Age 
  chartGroup.append("text")
    .attr("transform", `translate(${(width + 90) / 2}, ${height + margin.top + 50})`)
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Age (Median)");

  // Second Y Axes Label: Smokes (%)
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - ((height - 100)/ 2))
    .attr("dy", "4em")
    .attr("class", "axisText")
    .attr("class", "ytext inactive")
    .text("Smokes (%)");

  // Third X Axes Label: Household Income vs y Obese
  chartGroup.append("text")
    .attr("transform", `translate(${(width + 90) / 2}, ${height + margin.top + 45})`)
    .attr("y", 26)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class", "aText inactive x")
    .text("Household Income (Median)");

  // Third Y Axes Label: Obese (%)
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - ((height - 100 )/ 2))
    .attr("dy", "2em")
    .attr("class", "ytext inactive")
    .text("Obese (%)");

    // transition on page load
    // See 20190904WED-WK16-D3-#11
  chartGroup.selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", (d) => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare));

    });


    

