fetch('./data/json/mental_data.json') 
.then(response => response.json())  
.then(function(data) {
  // filtering the data
  let filteredData = data.filter(d =>
    d.indicator === "Symptoms of Anxiety Disorder or Depressive Disorder" &&
    d.group === "By Age"
  );

  // adding the age groups
  const AgeGroups = Array.from(new Set(filteredData.map(d => d.subgroup)));

  // adding data to the drop
  const dropdown = d3.select("#ageGroupDropdown");
  AgeGroups.forEach(age => {
    dropdown.append("option").text(age).property("value", age);
  });

  // building bar chart
  function buildBarChart(selectedAgeGroup) {
    // filtering data
    const ageData = filteredData
      .filter(d => d.subgroup === selectedAgeGroup)
      .sort((a, b) => new Date(a.time_start) - new Date(b.time_start));

    const trace = {
      x: ageData.map(d => d.time_start),
      y: ageData.map(d => d.value),
      type: "bar",
      marker: { color: "skyblue" }
    };

    const layout = {
      title: { text: `Anxiety/Depression Scores Over Time: ${selectedAgeGroup}` },
      xaxis: { title: 
        { text: "Date"}, 
        tickangle: -45 },
      yaxis: { title: 
        { text: "Symptom Score"}, 
        range: [0, 100] },
      margin: { t: 50, l: 60 }
    };

    Plotly.newPlot("bar", [trace], layout);
  }

  // dropdown adjustments
  dropdown.on("change", function() {
    const selected = d3.select(this).property("value");
    buildBarChart(selected);
  });

  // loading the data into the chart
  buildBarChart(AgeGroups[0]);
});
