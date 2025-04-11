// Mental health data organization
let AgeGroups = [
    "18 - 29 years", "30 - 39 years", "40 - 49 years", "50 - 59 years", "60 - 69 years", 
    "70 - 79 years", "80 years and above"
  ];
  
  let MentalValues = [
    46.8, 39.6, 38.9, 35.8, 28.9, 21.5, 21.1
  ];
  
  // Function to build the chart from selected age group
  function buildBarChart(selectedAgeGroup) {
    // Find the index of the selected age group
    const ageGroupIndex = AgeGroups.indexOf(selectedAgeGroup);
    
    if (ageGroupIndex === -1) return; // No match, exit
  
    // Get the value for the selected age group
    const selectedValue = MentalValues[ageGroupIndex];
  
    // Data for the selected age group
    let barOutline = {
      x: [selectedAgeGroup], 
      y: [selectedValue],  
      type: "bar",
      orientation: "v",
      marker: {
        color: 'lightblue' 
      }
    };
  
    let barDetails = {
      title: `Symptoms of Anxiety Disorder or Depressive Disorder for ${selectedAgeGroup}`,
      margin: { t: 40, l: 70 },
      xaxis: {
        title: "Age Group",
        tickvals: AgeGroups, 
      },
      yaxis: { 
        title: "Score",
        range: [0, 100] 
      },
      bargap: 0.1, 
      bargroupgap: 0.1 
    };
  
    // Render the Bar Chart
    Plotly.newPlot("bar", [barOutline], barDetails);
  }
  
  // Function to populate the dropdown
  function populateDropdown() {
    let dropdown = d3.select("#ageGroupDropdown");
  
    // Add options to the dropdown
    AgeGroups.forEach((ageGroup) => {
      dropdown.append("option")
        .text(ageGroup)
        .property("value", ageGroup);
    });
  
    // Listen for change on the dropdown to update the chart
    dropdown.on("change", function() {
      const selectedAgeGroup = d3.select(this).property("value");
      buildBarChart(selectedAgeGroup); 
    });
  
    // Initialize the chart with the first option in the dropdown
    buildBarChart(AgeGroups[0]); 
  }
  
  // Initialize the page with the dropdown
  populateDropdown();
  
  