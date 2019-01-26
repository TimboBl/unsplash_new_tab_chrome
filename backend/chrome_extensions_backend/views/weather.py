import os
import urllib.request
from chrome_extensions_backend import app
# TODO make this into a blueprint and try the request


@app.route("/weather", methods=["GET"])
def get_weather(city):
    response = urllib.request.urlopen("https://api.openweathermap.org/data/2.5/forecast?q=" + city +
                                      "&mode=json&units=metric&APPID=" + os.environ["OWMAPPID"]).read()
    print(response)
