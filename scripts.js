const cardDeck = [...Array(52).keys()];
let playerCards = [];
let playerPoints = [];
let bankerCards = [];
let bankerPoints = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function cardPoint(x) {
    if (x % 13 === 0) return 11;
    else if (x % 13 > 9) return 10;
    else return x % 13 + 1;
}

function printCard(c) {
    return c.map(i => {
        const suit = ['♠', '♥', '♦', '♣'][Math.floor(i / 13)];
        const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][i % 13];
        return suit + rank;
    }).join(' ');
}

function deal(gamerCards, gamerPoints) {
    const temp = cardDeck.pop();
    gamerCards.push(temp);
    gamerPoints.push(cardPoint(temp));
}

function updateDisplay() {
    document.getElementById('player-cards').innerText = printCard(playerCards);
    document.getElementById('player-points').innerText = `點數: ${playerPoints.reduce((a, b) => a + b, 0)}`;
    document.getElementById('banker-cards').innerText = printCard(bankerCards);
    document.getElementById('banker-points').innerText = `點數: ${bankerPoints.reduce((a, b) => a + b, 0)}`;
}

function checkWinner() {
    const playerSum = playerPoints.reduce((a, b) => a + b, 0);
    const bankerSum = bankerPoints.reduce((a, b) => a + b, 0);
    let message = "";

    if (playerSum > 21) {
        message = "玩家爆牌，莊家獲勝！";
    } else if (bankerSum > 21) {
        message = "莊家爆牌，玩家獲勝！";
    } else if (playerSum === bankerSum) {
        message = "平局！";
    } else if (playerSum > bankerSum) {
        message = "玩家獲勝！";
    } else {
        message = "莊家獲勝！";
    }

    document.getElementById('message').innerText = message;
}

function restartGame() {
    playerCards = [];
    playerPoints = [];
    bankerCards = [];
    bankerPoints = [];
    shuffle(cardDeck);

    document.getElementById('player-cards').innerText = "";
    document.getElementById('player-points').innerText = "點數: 0";
    document.getElementById('banker-cards').innerText = "";
    document.getElementById('banker-points').innerText = "點數: 0";
    document.getElementById('message').innerText = "";
}

document.getElementById('deal').addEventListener('click', () => {
    shuffle(cardDeck);
    playerCards = [];
    playerPoints = [];
    bankerCards = [];
    bankerPoints = [];

    for (let i = 0; i < 2; i++) deal(playerCards, playerPoints);
    deal(bankerCards, bankerPoints);

    updateDisplay();
    document.getElementById('message').innerText = "";
});

document.getElementById('hit').addEventListener('click', () => {
    deal(playerCards, playerPoints);
    let playerSum = playerPoints.reduce((a, b) => a + b, 0);

    if (playerSum > 21 && playerPoints.includes(11)) {
        playerPoints[playerPoints.indexOf(11)] = 1;
    }

    updateDisplay();

    playerSum = playerPoints.reduce((a, b) => a + b, 0);
    if (playerSum > 21) {
        document.getElementById('message').innerText = "玩家爆牌，莊家獲勝！";
    }
});

document.getElementById('stand').addEventListener('click', () => {
    let bankerSum = bankerPoints.reduce((a, b) => a + b, 0);

    while (bankerSum < 17) {
        deal(bankerCards, bankerPoints);
        bankerSum = bankerPoints.reduce((a, b) => a + b, 0);
        if (bankerSum > 21 && bankerPoints.includes(11)) {
            bankerPoints[bankerPoints.indexOf(11)] = 1;
        }
        updateDisplay();
    }

    checkWinner();
});

document.getElementById('restart').addEventListener('click', restartGame);
