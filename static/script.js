let playerName = "";
let playerScore = 0;
let computerScore = 0;
let roundsLeft = 3;

function startGame() {
    playerName = document.getElementById("name-input").value.trim();
    if (playerName === "") {
        alert("Please enter your name!");
        return;
    }
    document.getElementById("greeting").innerText = `Hello, ${playerName}!`;
    document.getElementById("player-name").style.display = "none";
    document.getElementById("game-section").style.display = "block";
}

function playGame(playerChoice) {
    if (roundsLeft === 0) return;

    fetch('/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choice: playerChoice })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("computer-choice").innerText = `Computer chose: ${data.computer_choice}`;

        if (data.result === "win") {
            playerScore++;
            document.getElementById("result").innerText = `🎉 ${playerName} wins this round!`;
        } else if (data.result === "tie") {
            document.getElementById("result").innerText = "🤝 It's a Tie!";
        } else {
            computerScore++;
            document.getElementById("result").innerText = "😢 Computer wins this round!";
        }

        roundsLeft--;
        document.getElementById("player-score").innerText = playerScore;
        document.getElementById("computer-score").innerText = computerScore;
        document.getElementById("round-count").innerText = roundsLeft;

        if (roundsLeft === 0) {
            declareWinner();
        }
    });
}

function declareWinner() {
    let finalMessage = "";
    if (playerScore > computerScore) {
        finalMessage = `🏆 Congratulations ${playerName}, you won the game!`;
    } else if (playerScore < computerScore) {
        finalMessage = "🤖 Computer wins the game! Better luck next time.";
    } else {
        finalMessage = "🔥 It's a tie! Well played!";
    }

    document.getElementById("result").innerText = finalMessage;
    document.getElementById("reset-btn").style.display = "inline-block";
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsLeft = 3;
    document.getElementById("result").innerText = "";
    document.getElementById("computer-choice").innerText = "";
    document.getElementById("player-score").innerText = playerScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("round-count").innerText = roundsLeft;
    document.getElementById("reset-btn").style.display = "none";
}
