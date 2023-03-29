// URL containing sample Dataset
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Default display of plots
function init() {

    // D3 drop-down menu
    let dropdownMenu = d3.select("#selDataset");

    // Grab data from the dataset, then console-logging it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // ID Names Array
        let names = data.names;

        // Iteration
        names.forEach((name) => {
            // Appending of each name as an option in the drop-down menu
            dropdownMenu.append("option").text(name).property("value", name);
        });

        let name = names[0];

        // Call functions for prereq. charts
        demo(name);
        bar(name);
        bubble(name);
        gauge(name);
    });
}

// Demographic Panel
function demo(selectedValue) {
    // Grab data from the dataset, then console-logging it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // Metadata obj. Array
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types; meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign the first object to obj variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object.entries() is a built-in method in JavaScript; eturns an array of given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        
        // Iterate through the entries array
        // h5 child element for each key-value pair to div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  }
  

// Make the bar chart
function bar(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // Assign the first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the horizontal bar chart
        let trace = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(10, 47, 81)"
            },
            orientation: "h"
        }];
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}
  
// Make the bubble chart
function bubble(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // Sample Data Array
        let samples = data.samples;
    
        // Data filtering 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        // Assigning first object to obj variable
        let obj = filteredData[0];
        
        // Trace for the data for the bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Greens"
            }
        }];
    
        // Apply the x-axis lengend to the layout
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Gauge Chart 
function gauge(selectedValue) {
    // Grabbing Data/Console Logging
    d3.json(url).then((data) => {
        // Metadata obj. Array
        let metadata = data.metadata;
        
        // Filtering Data
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assigning first object to obj variable
        let obj = filteredData[0]

        // Trace for data in gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator", 
            mode: "gauge+number",
            gauge: {
                axis: {range: [null, 10]}, 
                bar: {color: "rgb(10, 47, 81)"},
                steps: [
                    { range: [0, 1], color: "rgb(222, 237, 207)" },
                    { range: [1, 2], color: "rgb(191, 225, 176)" },
                    { range: [2, 3], color: "rgb(153, 212, 146)" },
                    { range: [3, 4], color: "rgb(116, 198, 122)" },
                    { range: [4, 5], color: "rgb(86, 184, 112)" },
                    { range: [5, 6], color: "rgb(57, 169, 107)" },
                    { range: [6, 7], color: "rgb(29, 154, 108)" },
                    { range: [7, 8], color: "rgb(24, 137, 119)" },
                    { range: [8, 9], color: "rgb(19, 113, 119)" },
                    { range: [9, 10], color: "rgb(14, 77, 100)" }
                ]
            }
        }];

         // Plotly to plot data in gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// Toggle new plots when option is changed
function optionChanged(selectedValue) {
    demo(selectedValue);
    bar(selectedValue);
    bubble(selectedValue);
    gauge(selectedValue)
}

init();