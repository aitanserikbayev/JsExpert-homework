let total = 0;
const result = document.getElementById("result");

for (let i = 0; i < 15; i++) {
  let first = Math.floor((Math.random() * 6) + 1);
  let second = Math.floor((Math.random() * 6) + 1);

  if (i == 8 || i == 13) {
    continue;
  }

  result.innerHTML += "Первая кость: " + first + " Вторая кость " + second + "<br/>";

  if (first == second) {
    result.innerHTML += "<i>Выпал дубль. Число " + first + "</i><br/>";
  }

  if (first < 3 && second > 4 || first > 4 && second < 3) {
    result.innerHTML += "<i>Большой разброс между костями. Разница составляет " + Math.abs((second - first)) + "</i><br/>";
  }

  total += first + second;
}

total > 100 ? result.innerHTML += "<strong>Победа, вы набрали " + total + " очков</strong>" : result.innerHTML += "<strong>Вы проиграли, у вас " + total + " очков<strong/>"