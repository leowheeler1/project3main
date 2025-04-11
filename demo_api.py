from flask import Flask
import psycopg2
from passwords import user, passw  # include a file to configure these for your own use

# Setup
app = Flask(__name__)

conn1 = psycopg2.connect(f"dbname=covid user={user} password={passw}")
conn2 = psycopg2.connect(f"dbname=mental_health user={user} password={passw}")
cursor1 = conn1.cursor()
cursor2 = conn2.cursor()

def makeJSON(records):
    output = []
    for i in range(len(records)):
        temp_out = {
            'week' : records[i][0],
            'state' : records[i][1],
            'week_start' : records[i][2],
            'covid_d' : records[i][3],
            'pneum_d' : records[i][4],
            'flu_d' : records[i][5],
            'anyof3_d' : records[i][6],
            'total_d' : records[i][7],
            'poe_d' : records[i][8],
            'year': records[i][9]}
        output.append(temp_out)
    return output

def makeJSON2(records):
    output = []
    for i in range(len(records)):
        temp_out = {
            'indicator':records[i][0],
            'group':records[i][1],
            'state':records[i][2],
            'subgroup':records[i][3],
            'time_start':records[i][4],
            'time_end':records[i][5],
            'value':records[i][6],
            'low':records[i][7],
            'high':records[i][8]
        }
        output.append(temp_out)
    return output

# Routes

@app.route("/")
def index():
    # List all available routes
    routes = ["/api/covid/v1/place/<state>",
              "/api/covid/v1/date/<year>",
              "/api/mental-health/v1/place/<state>",
              "/api/mental-health/v1/groups/<group>"]
    return [{"Routes":[f"{route}" for route in routes]},
            
            {"State Options": ['United States', 
                              'any of the 50 states individually',
                              'Puerto Rico']},

            {"Year Options": {'Covid':[2020,2021,2022,2023,2024,2025],
                             'Mental Health':[2020,2021,2022,2023,2024]}},

            {"Groups for Mental Health DB": ['National Estimate', 
                                            'By Age', 
                                            'By Sex', 
                                            'By Race', 
                                            'By Education', 
                                            'By State', 
                                            'By Disability Status', 
                                            'By Gender Identity', 
                                            'By Sexual Orientation']}]

@app.route("/api/covid/v1/place/<state>") # All data from covid db for given state
def getState(state):
    sql = "select * from covid where state like (%s)"
    data = (state.title(),)
    cursor1.execute(sql, data)
    records = cursor1.fetchall()
    output = makeJSON(records)
    return output
    
@app.route("/api/covid/v1/date/<year>") # All data from covid db for given year
def getYear(year):
    sql = "select * from covid where year = (%s)"
    data = (year,)
    cursor1.execute(sql, data)
    records = cursor1.fetchall()
    output = makeJSON(records)
    return output

@app.route("/api/mental-health/v1/place/<state>") # All data from mental_health db for given state
def getStateM(state):
    sql = "select * from mental where state like (%s)"
    data = (state.title(),)
    cursor2.execute(sql, data)
    records = cursor2.fetchall()
    output = makeJSON2(records)
    return output

@app.route("/api/mental-health/v1/groups/<group>") # All data from mental_health db for given year
def getYearM(group):
    sql = "select * from mental where divisor like (%s)"
    data = (group.title(),)
    cursor2.execute(sql, data)
    records = cursor2.fetchall()
    print(records)
    output = makeJSON2(records)
    return output


if __name__ == '__main__':
    app.run(debug=True)