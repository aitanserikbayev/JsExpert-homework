(function () {
  let days = [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
    months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря"
    ];

  setDate();

  setInterval(function () {
    setDate();
  }, 1000);

  function setDate() {
    let date = new Date(),
      weekDay = date.getDay(),
      day = date.getDate(),
      month = date.getMonth(),
      hoursDigit1 = parseInt(date.getHours()/10),
      hoursDigit2 = date.getHours()%10,
      minutesDigit1 = parseInt(date.getMinutes()/10),
      minutesDigit2 = date.getMinutes()%10,
      secondsDigit1 = parseInt(date.getSeconds()/10),
      secondsDigit2 = date.getSeconds()%10,
      nextYear = date.getFullYear() + 1,
      targetDate = new Date(nextYear, 0, 1),
      left = Math.ceil((targetDate - date) / (1000*60*60*24));

    document.getElementById('weekDay').innerText = days[weekDay - 1].toLowerCase();
    document.getElementById('day').innerText = String(day);
    document.getElementById('month').innerText = months[month].toLowerCase();
    document.getElementsByClassName('hours')[0].children[0].children[0].innerText = hoursDigit1;
    document.getElementsByClassName('hours')[0].children[1].children[0].innerText = hoursDigit2;
    document.getElementsByClassName('minutes')[0].children[0].children[0].innerText = minutesDigit1;
    document.getElementsByClassName('minutes')[0].children[1].children[0].innerText = minutesDigit2;
    document.getElementsByClassName('seconds')[0].children[0].children[0].innerText = secondsDigit1;
    document.getElementsByClassName('seconds')[0].children[1].children[0].innerText = secondsDigit2;
    document.getElementById('left').innerText = String(left);
    document.getElementById('nextYear').innerText = String(nextYear);
  }
}());