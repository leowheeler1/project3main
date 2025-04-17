// bubblechart.js

let mentalData = [];
let covidData = [];
let covidUS = [];


async function loadAndPlotData() {
    const mentalRes = await fetch('./data/json/mental_data.json');
    const covidRes = await fetch('./data/json/covid_data.json');

    mentalData = await mentalRes.json();
    covidData = await covidRes.json();
    covidUS = covidData.filter(d => d.state === "United States");

    applyFilters();
}


function applyFilters() {
    const selectedGroup = document.getElementById("group-select").value;
    const selectedYear = document.getElementById("year-select").value;

    const yearToSymbol = {
        "2020": "circle",
        "2021": "square",
        "2022": "diamond",
        "2023": "triangle-up",
        "2024": "star"
    };

    const filtered = mentalData.filter(d => {
        const matchIndicator = d.indicator.includes("Depressive Disorder");
        const matchGroup = selectedGroup === "All" || d.group === selectedGroup;
        const matchYear = selectedYear === "All" || new Date(d.time_start).getFullYear() === parseInt(selectedYear);
        return matchIndicator && matchGroup && matchYear;
    });

    const points = filtered.map(mental => {
        const start = new Date(mental.time_start);
        const end = new Date(mental.time_end);
        const year = start.getFullYear();

        const covidMatches = covidUS.filter(entry => {
            const week = new Date(entry.week_start);
            return week >= start && week <= end;
        });

        const covidSum = covidMatches.reduce((sum, d) => sum + (d.covid_d || 0), 0);

        return {
            x: mental.value,
            y: covidSum,
            text: `${mental.subgroup} (${mental.time_start} to ${mental.time_end})`,
            size: mental.value * 0.795,
            symbol: yearToSymbol[year] || "circle"
        };
    });

    const trace = {
        x: points.map(p => p.x),
        y: points.map(p => p.y),
        text: points.map(p => p.text),
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: points.map(p => p.size),
            color: points.map(p => p.x),
            symbol: points.map(p => p.symbol),
            colorscale: 'Viridis',
            showscale: true
        }
    };

    const layout = {
        title: {
            text: `Depressive Symptoms vs COVID Deaths (${selectedGroup}, ${selectedYear})`,
            font: { size: 24 }
        },
        xaxis: {
            title: {
                text: 'Depressive Symptoms (%)',
                font: { size: 16 }
            }
        },
        yaxis: {
            title: {
                text: 'COVID Deaths (During Survey Window)',
                font: { size: 16 }
            }
        }
    };

    Plotly.newPlot('unified-chart', [trace], layout, { responsive: true });
}

loadAndPlotData();
