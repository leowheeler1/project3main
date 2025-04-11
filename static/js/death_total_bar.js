fetch('../../data/json/state_death_totals.json')
    .then(response => response.json())
    .then(data => {
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
            title: {text: 'Covid vs. Pneumonia Deaths for all 50 States + Puerto Rico'},
            xaxis: { title: {text:'State'} },
            yaxis: { title: {text:'Death Count'}}
        };

        let data1 = [trace1, trace2];

        Plotly.newPlot('deathBar', data1, layout);
        })
    .catch(error => console.error('Error loading data:', error));

