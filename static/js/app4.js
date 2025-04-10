// sample data to test, finished product will pull from json or SQ
// 
let sampleDeaths1 = [
    300, 50, 500, 200, 3500, 250, 150, 120, 4000, 350, 50, 80, 1200, 400, 250, 
    150, 300, 600, 40, 900, 1200, 1300, 350, 200, 400, 60, 100, 250, 50, 2300, 
    150, 3500, 800, 120, 1000, 300, 100, 1500, 70, 400, 150, 700, 5000, 80, 30, 
    1000, 500, 200, 400
  ];
  let sampleDeaths2 = [
    280, 280, 310, 310, 320, 330, 380, 350, 360, 370, 380, 390, 400, 410, 420, 
    430, 440, 450, 460, 470, 480, 390, 500, 510, 520, 530, 540, 550, 560, 570, 
    580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 
    730, 740, 750, 360, 370, 380, 390
  ];
  let sampleDeaths3 = [
    30, 100, 30, 40, 33, 230, 180, 160, 42, 350, 8, 110, 12, 40, 29, 
    180, 30, 600, 70, 910, 1180, 130, 30, 200, 40, 6, 10, 270, 90, 2100, 
    190, 320, 77, 14, 98, 32, 13, 140, 10, 46, 190, 700, 5100, 120, 55, 
    100, 510, 240, 440
  ];
  
  let sampleWeeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52
  ];
  let newSample = [];
  
  // function to build chart from sample data
  function buildChartSample(abc) {
      // Build a Line Chart
      let covidData = [{
        x: sampleWeeks,
        y: abc,
        type: "scatter",
        mode: "lines",
        name: "Deaths per week"
      }]
      let lineLayout = {
        title: "Covid Deaths Per Week",
        xaxis: {title:"Week"},
        yaxis: {title: "Deaths"}
      }
  
      // Render the Line Chart
      Plotly.newPlot("line-chart", covidData, lineLayout);
    };
  
  
  // Function to run on page load
  function init() {
    d3.json("https://data.cdc.gov/resource/r8kw-7aab.json").then((data) => {
  
      // Get the states to populate states dropdown
      // currently hard coded, need to re-write to pull from json/SQL
      let namesfield = [
        "United States", "Alabama", "Alaska", "Arizona", "Arkansas", "California",
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];
    let testField = ["sampleDeaths1", "sampleDeaths2", "sampleDeaths3"];
    let yearsField = ["2020", "2021", "2022", "2023", "2024", "2025"];
      // Use d3 to select the dropdown with id of `#selDataset`
      let dropdown = d3.select("#selState");
  
      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name.
      for (let i = 0; i < namesfield.length; i++){
        dropdown.append("option").text(namesfield[i]).property("value", namesfield[i]);
      }
  
      let dropdown2 = d3.select("#testCategory");
  
      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name.
      for (let i = 0; i < testField.length; i++){
        dropdown2.append("option").text(testField[i]).property("value", testField[i]);
      }  
      let dropdown3 = d3.select("#selYear");
  
      // Use the list of sample names to populate the select options
      // Hint: Inside a loop, you will need to use d3 to append a new
      // option for each sample name.
      for (let i = 0; i < yearsField.length; i++){
        dropdown3.append("option").text(yearsField[i]).property("value", yearsField[i]);
      }   
      // Get the first sample from the list
      let first = namesfield[0];
  
      // Build charts and metadata panel with the first sample
      buildChartSample(sampleDeaths1);
      // buildMetadata(first);
    });
  }
  
  // // Function for event listener
  // function option2Changed(newDeaths) {
  //   // Build charts and metadata panel each time a new sample is selected
  //   buildCharts(newDeaths);
  //   // buildMetadata(newSample);
  // }
  function option2Changed(newDeaths) {
    let selectedData;
  
   // Map the selected value to the corresponding dataset
    switch(newDeaths) {
      case "sampleDeaths1":
        selectedData = sampleDeaths1;
        break;
      case "sampleDeaths2":
        selectedData = sampleDeaths2;
        break;
      case "sampleDeaths3":
        selectedData = sampleDeaths3;
        break;
      default:
        console.error("Unknown dataset: " + newDeaths);
        return; // Exit if the dataset is unknown
    }
    buildChartSample(selectedData);
  }
  // Initialize the dashboard
  init();


  //pull data to graph covid 2020 United States Death per Week
  d3.json("https://data.cdc.gov/resource/r8kw-7aab.json").then(function(data){
    let filteredData = data.filter(function(item){
      return item.state === "United States" & item.year === "2020"
    })
    let covidDeaths = filteredData.map(function(item){
      return item.covid_19_deaths;
    })
    let yaxisCovid = Array.from({length: covidDeaths.length}, (v,i)=>i+1);
    console.log(covidDeaths)
    console.log(yaxisCovid)
  });

// function to build charts with real data from json
function buildChartSample(abc) {
    // Build a Line Chart
    let covidData = [{
      x: sampleWeeks,
      y: abc,
      type: "scatter",
      mode: "lines",
      name: "Deaths per week"
    }]
    let lineLayout = {
      title: "Covid Deaths Per Week",
      xaxis: {title:"Week"},
      yaxis: {title: "Deaths"}
    }

    // Render the Line Chart
    Plotly.newPlot("line-chart", covidData, lineLayout);
  };



  function buildChartLive(state, year) {
    d3.json("https://data.cdc.gov/resource/r8kw-7aab.json?$limit=18197").then(function(data){
      let filteredData = data.filter(function(item){
        return item.state === state & item.year === year
      })
      let covidDeaths = filteredData.map(function(item){
        return item.covid_19_deaths;
      }).slice(0,51

      );
      let xaxisCovid = Array.from({length: covidDeaths.length}, (v,i)=>i+1);
      let covidData = [{
        x: xaxisCovid,
        y: covidDeaths,
        type: "scatter",
        mode: "lines",
        name: "Deaths per week"
      }]
      let lineLayout = {
        title: "Covid Deaths Per Week, " + state + " " + year,
        xaxis: {title:"Week"},
        yaxis: {title: "Deaths"}
      }
  
      // Render the Line Chart
      Plotly.newPlot("line-chart", covidData, lineLayout);  
    });
  }

function stateChanged(state) {
  let currentYear = document.getElementById("selYear")
  let year = currentYear.value;
  buildChartLive(state, year)
};

function yearChanged(year){
  let currentState = document.getElementById("selState");
  let state = currentState.value;
  buildChartLive(state, year)
};







// this is working code to pull current value from dropdown boxes
// function yearChanged(){
//   let currentState = document.getElementById("selState");
//   let selectedState = currentState.value;
//   let currentYear = document.getElementById("selYear")
//   let selectedYear = currentYear.value;

// console.log(selectedState)
// }