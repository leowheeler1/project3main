let tickvals = [];
let tickmode = "array"


fetch('project3main/data/json/state_death_totals.json')
    .then(response => response.json())
    .then(data => {
        for (i=0; i < data.length; i++) {
            tickvals.push(i)
        };


        const trace1 = {
            x: data.map(item => item.state),
            y: data.map(item => item.covid_d),
            type: 'bar',
            marker: {
                color: 'green'
            },
            name: 'covid deaths'
        };

        const trace2 = {
            x: data.map(item => item.state),
            y: data.map(item => item.pneum_d),
            type: 'bar',
            marker: {
                color: 'navy'
            },
            name: 'pneumonia deaths'
        };


        const layout = {
            title: {
                text: 'Covid vs. Pneumonia Deaths for all 50 States + Puerto Rico + New York City (2020-2025)'
            },
            xaxis: { 
                title: {text:'State', font: {size:16}, standoff:0},
                tickmode: tickmode,
                tickvals: tickvals,
                ticktext: data.map(item => item.state),
                tickangle: -90 
            },
            yaxis: { 
                title: {text:'Death Count'}
            },
            margin: {
                b:150
            },
            showlegend: true
        };

        let data1 = [trace1, trace2];

        Plotly.newPlot('deathBar', data1, layout, {staticPlot: false});
        })
    .catch(error => console.error('Error loading data:', error));


fetch('project3main/data/json/high_death.json')
    .then(response => response.json())
    .then(data => {
        const trace1 = {
            x: data.map(item => item.state),
            y: data.map(item => item.covid_d),
            type: 'bar',
            marker: {
                color: 'green'
            },
            text: data.map(item => item.covid_d),
            name: 'covid deaths'
        };

        const trace2 = {
            x: data.map(item => item.state),
            y: data.map(item => item.pneum_d),
            type: 'bar',
            marker: {
                color: 'navy'
            },
            text: data.map(item => item.pneum_d),
            name: 'pneumonia deaths'
        };

        const layout = {
            title: {
                text: '3 Highest Death Totals for Covid + Pneumonia (2020-2025)'
            },
            xaxis: { 
                title: {text:'State'} 
            },
            yaxis: { 
                title: {text:'Death Count'}
            }
        };

        let data1 = [trace1, trace2];

        Plotly.newPlot('highDeathBar', data1, layout, {staticPlot: true});
    })
    .catch(error => console.error('Error loading data: ', error))


    fetch('project3main/data/json/higher_covid.json')
    .then(response => response.json())
    .then(data => {
        const trace1 = {
            x: data.map(item => item.state),
            y: data.map(item => item.covid_d),
            type: 'bar',
            marker: {
                color: 'green'
            },
            text: data.map(item => item.covid_d),
            name: 'covid deaths'
        };

        const trace2 = {
            x: data.map(item => item.state),
            y: data.map(item => item.pneum_d),
            type: 'bar',
            marker: {
                color: 'navy'
            },
            text: data.map(item => item.pneum_d),
            name: 'pneumonia deaths'
        };

        const layout = {
            title: { 
                text: 'States with more Covid Deaths than Pneumonia Deaths (2020-2025)'
            },
            xaxis: { 
                title: {text:'State'} 
            },
            yaxis: { 
                title: {text:'Death Count'},
                range: [0, 600000]
            },                   
        };

        let data1 = [trace1, trace2];

        Plotly.newPlot('covidBar', data1, layout, {staticPlot: true});
    })
    .catch(error => console.error('Error loading data: ', error))