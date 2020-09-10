let total = 0;
let result = "";
const resultContainer = document.getElementById("result");

(function run() {
  for (let i = 0; i < 15; i++) {
    let first = getRndNumber();
    let second = getRndNumber();

    if (i == 8 || i == 13) {
      continue;
    }

    setResult("Первая кость: " + first + " Вторая кость " + second + "<br/>");

    isNumbersEqual(first, second);

    isBigDifference(first, second);

    setTotal(first, second);
  }

  printResult();
}());

function getRndNumber() {
  return Math.floor((Math.random() * 6) + 1);
}

function setResult(str) {
  return result += str;
}

function isNumbersEqual(a, b) {
  if (a == b) {
    setResult("<i>Выпал дубль. Число " + a + "</i><br/>");
  }
}

function isBigDifference(a, b) {
  if (a < 3 && b > 4 || a > 4 && b < 3) {
    setResult("<i>Большой разброс между костями. Разница составляет " + Math.abs((b - a)) + "</i><br/>");
  }
}

function setTotal(a, b) {
  total += a + b;
}

function printResult() {
  resultContainer.innerHTML = setResult(total > 100 ? "<strong>Победа, вы набрали " + total + " очков</strong>" : "<strong>Вы проиграли, у вас " + total + " очков<strong/>");
}