fetch('./data/json/high_death.json')
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

        Plotly.newPlot('highDeathBar', data1, layout, {staticPlot: false});
    })
    .catch(error => console.error('Error loading data: ', error))


    fetch('./data/json/higher_covid.json')
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

        Plotly.newPlot('covidBar', data1, layout, {staticPlot: false});
    })
    .catch(error => console.error('Error loading data: ', error))