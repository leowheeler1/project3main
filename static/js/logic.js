// organize the mental health data
let AgeGroups = [
  "18 - 29 years", "30 - 39 years", "40 - 49 years", "50 - 59 years", "60 - 69 years", 
  "70 - 79 years", "80 years and above"
];

let MentalValues = [
  47.84, 39.28, 34.90, 31.29, 24.65, 18.45, 17.26
];

// build chart from the age group
function buildBarChart(selectedAgeGroup) {
  const ageGroupIndex = AgeGroups.indexOf(selectedAgeGroup);
  if (ageGroupIndex === -1) return; 

  // match the values with the age groups
  const selectedValue = MentalValues[ageGroupIndex];

  // add the data to the bar and format it
  let barOutline = {
    x: [selectedAgeGroup], 
    y: [selectedValue],  
    type: "bar",
    orientation: "v",
    marker: {
      color: 'lightpink' 
    }
  };

  let barDetails = {
    title: `Average Mental Health Disorder Scores ${selectedAgeGroup}`,
    margin: { t: 40, l: 70 },
    xaxis: {
      title: "Age Group",
      tickvals: AgeGroups, 
    },
    yaxis: { 
      title: "Axiety or Depressive Disorder Score",
      range: [0, 100] 
    },
    bargap: 0.1, 
    bargroupgap: 0.1 
  };

  // render the Bar Chart
  Plotly.newPlot("bar", [barOutline], barDetails);
}

// populate the dropdown
function populateDropdown() {
  let dropdown = d3.select("#ageGroupDropdown");

  AgeGroups.forEach((ageGroup) => {
    dropdown.append("option")
      .text(ageGroup)
      .property("value", ageGroup);
  });

  // update the chart according to the dropdown
  dropdown.on("change", function() {
    const selectedAgeGroup = d3.select(this).property("value");
    buildBarChart(selectedAgeGroup); 
  });

  // initialize the chart with the first option in the dropdown
  buildBarChart(AgeGroups[0]); 
}

// Iiitialize the page with the dropdown
populateDropdown();




  