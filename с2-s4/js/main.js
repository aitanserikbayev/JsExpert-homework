let btn = document.getElementById("play");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let result = document.getElementById("result");

function getPlayerResult() {
    return Math.floor((Math.random() * 3) + 1);
}

function runGame() {
    let player1Res = getPlayerResult(),
      player2Res = getPlayerResult();
    player1.innerHTML = getNameById(player1Res);
    player2.innerHTML = getNameById(player2Res);

    printResult(determineWinner(player1Res, player2Res));
}

btn.addEventListener("click", runGame);

function getNameById(num) {
    switch (num) {
        case 1:
            return "Камень";
        case 2:
            return "Ножницы";
        case 3:
            return "Бумага";
        default:
            return false
    }
}

function determineWinner(res1, res2) {
    if (res1 == res2) {
        return 0
    } else if (res1 == 1 && res2 == 2 || res1 == 2 && res2 == 3 || res1 == 3 && res2 == 1) {
        return 1
    } else {
        return 2
    }
}

function printResult(winner) {
    if (winner == 0) {
        result.innerHTML = "Ничья"
    } else {
        result.innerHTML = "Выиграл " + (winner == 1 ? "первый" : "второй") + " игрок"
    }
}