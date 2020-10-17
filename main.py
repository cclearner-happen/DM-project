from flask import Flask, render_template, url_for

app = Flask(__name__, instance_relative_config=True)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)