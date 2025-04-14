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
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming", "Puerto Rico"
    ];

    let yearsField = ["2020", "2021", "2022", "2023", "2024", "2025", "All"];
      // Use d3 to select the dropdown with id of `#selDate`
      let dropdown = d3.select("#selState");
  
      // Use the list of sample names to populate the select options

      for (let i = 0; i < namesfield.length; i++){
        dropdown.append("option").text(namesfield[i]).property("value", namesfield[i]);
      }
  
      let dropdown3 = d3.select("#selYear");
  
      // Use the list of sample names to populate the select options
      for (let i = 0; i < yearsField.length; i++){
        dropdown3.append("option").text(yearsField[i]).property("value", yearsField[i]);
      }   
 
      // Build chart for United States, 2020, Reported by Week
      buildChartLive("United States", "2020", "Week");
    });
  }
  // Initialize the dashboard
  init();

  
  
  function buildChartLive(state, year, rx) {
    // json weekly data through 14,795, then monthly data through 18577
    d3.json("https://data.cdc.gov/resource/r8kw-7aab.json?$limit=18575").then(function(data){
      let rxData = [];
      if (rx === "Week"){
        rxData = data.slice(0,14796);
      } else if (rx === "Month"){
        rxData = data.slice(14796, 18198);
      } else if (rx === "Year"){
        rxData = data.slice(18198,18575);
      }
      let filteredData = rxData.filter(function(item){
        return item.state === state && (year === "All" || item.year === year);
      });
      let covidDeaths = filteredData.map(function(item){
        return item.covid_19_deaths;
      });
      let totalDeaths = filteredData.map(function(item){
        return item.total_deaths;
      });
      let pneumDeaths = filteredData.map(function(item){
        return item.pneumonia_deaths;
      });
      let fluDeaths = filteredData.map(function(item){
        return item.influenza_deaths;
      });
      let eitherDeaths = filteredData.map(function(item){
        return item.pneumonia_influenza_or_covid_19_deaths;
      });           
      let xaxisCovid = Array.from({length: covidDeaths.length}, (v,i)=>i+1);

      let cTrace = {
        x: xaxisCovid,
        y: covidDeaths,
        type: "scatter",
        mode: "lines",
        name: "Covid"
      };

      let tTrace = {
        x: xaxisCovid,
        y: totalDeaths,
        type: "scatter",
        mode: "lines",
        name: "Total"
      };

      let pTrace = {
        x: xaxisCovid,
        y: pneumDeaths,
        type: "scatter",
        mode: "lines",
        name: "Pneumonia"
      };

      let fluTrace = {
        x: xaxisCovid,
        y: fluDeaths,
        type: "scatter",
        mode: "lines",
        name: "Influenza"
      };
      let eitherTrace = {
        x: xaxisCovid,
        y: eitherDeaths,
        type: "scatter",
        mode: "lines",
        name: "Pneomonia, Influenza or COVID-19"
      };

      let displayed = [];
      if (document.getElementById("covid").checked) {
        displayed.push(cTrace);
      }
      if (document.getElementById("total").checked) {
        displayed.push(tTrace);
      }
      if (document.getElementById("pneum").checked) {
        displayed.push(pTrace);
      }
      if (document.getElementById("flu").checked) {
        displayed.push(fluTrace);
      }
      if (document.getElementById("either").checked) {
        displayed.push(eitherTrace);
      }
      let chartTitleYear;
      if (year === "All"){
        chartTitleYear = "Entire Pandemic";
        } else {
            chartTitleYear = year;
        }
      let lineLayout = {
        title: "Deaths Per " + rx + ", " + state + ", " + chartTitleYear,
        xaxis: {title:rx},
        yaxis: {title: "Deaths"},
        showlegend: true
      }
  
      // Render the Line Chart
      Plotly.newPlot("line-chart", displayed, lineLayout);  
    });
  }
  
  function stateChanged(state) {
  let currentYear = document.getElementById("selYear")
  let year = currentYear.value;
  let rx = document.querySelector('input[name="reporttype"]:checked').value;
  buildChartLive(state, year, rx)
  };
  
  function yearChanged(year){
  let currentState = document.getElementById("selState");
  let state = currentState.value;
  let rx = document.querySelector('input[name="reporttype"]:checked').value;
  buildChartLive(state, year, rx)
  };
  
  function rxChanged(rx){
  let currentYear = document.getElementById("selYear")
  let year = currentYear.value;
  let currentState = document.getElementById("selState");
  let state = currentState.value;
  buildChartLive(state, year, rx)
  };
  
  function displayChanged(){
  let currentYear = document.getElementById("selYear")
  let year = currentYear.value;
  let currentState = document.getElementById("selState");
  let state = currentState.value;
  let rx = document.querySelector('input[name="reporttype"]:checked').value;
  buildChartLive(state, year, rx)
  } ; 