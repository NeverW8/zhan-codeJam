from flask import Flask, render_template, request
from chatgippity import get_ideas

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template("index.html")


@app.route("/chat_gippity", methods=['GET'])
def chat_gippity():
    return get_ideas().split("\n")
