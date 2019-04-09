from chrome_extensions_backend import app
from flask import jsonify


@app.route("/")
def index():
    return jsonify({"message": "This is in fact a route!"})