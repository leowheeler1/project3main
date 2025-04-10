# brief data cleanup
import requests
import pandas as pd

output = [] # output list

for i in range(19): # just under 19000 observations, api limits to 1000 at a time
	offset = f'&$offset={0 + (i*1000)}' # allows us to keep the rest of the link static and just change the offset to go 'through the pages'
	url = f'https://data.cdc.gov/resource/r8kw-7aab.json?$limit=1000' # endpoint
	if i == 0: # we don't need the offset for 'page 1'
		response = requests.get(url)
	else: # we do need the offset for every other 'page'
		response = requests.get(url + offset)
	for item in response.json(): # unpack the list response and add new entries one at a time
		output.append(item) # makes it easier for pandas to put it all in a list

df = pd.DataFrame(output) # turn that into a dataframe

# selecting columns
df = df[['start_date', 'end_date', 'year', 'mmwr_week', 'state', 'covid_19_deaths', 'total_deaths', 'percent_of_expected_deaths', 'pneumonia_deaths', 'influenza_deaths','pneumonia_influenza_or_covid_19_deaths']]

# rename columns
df.columns = ['week_start', 'week_end', 'year', 'week', 'state', 'covid_d', 'total_d', 'poe_d', 'pneum_d', 'flu_d', 'anyof3_d']

# reorder columns
df = df[['week','state','week_start','covid_d','pneum_d','flu_d','anyof3_d','total_d','poe_d']]

df.to_csv('cdc_covid_data.csv') # output file