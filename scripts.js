let responses = [[], [], [], []];
const adminPassword = "your_admin_password";

function submitGuess(round) {
    const guessInput = document.getElementById(`guess${round}`);
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 0 || guess > 100) {
        alert("Please enter a valid number between 0 and 100.");
        return;
    }

    responses[round - 1].push(guess);
    guessInput.value = "";

    alert(`Response for round ${round} submitted. Thank you!`);
    window.location.href = "../index.html";
}

function showResults(round) {
    const password = prompt("Enter admin password:");
    if (password !== adminPassword) {
        alert("Incorrect password.");
        return;
    }

    const responseList = responses[round - 1];
    if (responseList.length === 0) {
        alert("No responses for this round yet.");
        return;
    }

    const sum = responseList.reduce((a, b) => a + b, 0);
    const average = sum / responseList.length;

    const distribution = new Array(101).fill(0);
    responseList.forEach(guess => {
        distribution[guess]++;
    });

    let distributionHTML = `<h2>Distribution for Round ${round}</h2><ul>`;
    for (let i = 0; i <= 100; i++) {
        if (distribution[i] > 0) {
            distributionHTML += `<li>${i}: ${distribution[i]}</li>`;
        }
    }
    distributionHTML += `</ul><h3>Average: ${average.toFixed(2)}</h3>`;

    const resultsDiv = document.createElement('div');
    resultsDiv.innerHTML = distributionHTML;
    document.body.appendChild(resultsDiv);
}
