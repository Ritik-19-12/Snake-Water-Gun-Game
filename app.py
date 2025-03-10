from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Choices for the game
choices = ["snake", "water", "gun"]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/play', methods=['POST'])
def play_game():
    data = request.json
    player_choice = data.get("choice")

    # Computer randomly selects
    computer_choice = random.choice(choices)

    # Game logic
    if (
        (player_choice == "snake" and computer_choice == "water") or
        (player_choice == "water" and computer_choice == "gun") or
        (player_choice == "gun" and computer_choice == "snake")
    ):
        result = "win"
    elif player_choice == computer_choice:
        result = "tie"
    else:
        result = "lose"

    return jsonify({"player_choice": player_choice, "computer_choice": computer_choice, "result": result})

if __name__ == '__main__':
    app.run(debug=True)
