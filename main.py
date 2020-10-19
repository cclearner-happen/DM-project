import os

from flask import Flask, render_template, url_for, request, redirect, flash
from werkzeug.utils import secure_filename

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/kmeans')
def kmeans():
    import kmeans
    kmeans.getColor()


if __name__ == "__main__":
    app.run(debug=True)
