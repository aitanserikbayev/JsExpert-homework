let btn = document.getElementById("play");

btn.addEventListener('click', transform);

function transform() {
  data.splice(5,1);

  let newArr = [];

  data.forEach(item => {
    let {id, ...rest} = item;

    newArr.push(rest)
  });

  let newArr1 = newArr.map(item => {
    return {
      name: item.name[0] + item.name.substring(1).toLowerCase(),
      url: "http://" + item.url,
      description: item.description.substr(0, 15) + '...',
      date: moment(new Date(item.date)).format('YYYY/MM/DD HH:mm'),
      params: item.params.status + '=>' + item.params.progress,
      isVisible: item.params.status
    }
  });

  let newArr2 = newArr1.filter(item => {
    return item.isVisible == true
  });

  printResult(newArr2);
}

function printResult(result) {
  console.log(result);
}