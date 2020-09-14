let btn = document.getElementById("play");

btn.addEventListener('click', transform);

function transform() {
  //Remove 6th element
  data.splice(5,1);

  let newArr = [];

  //Copy objects from data to new array without 'id' field
  data.forEach(item => {
    let {id, ...rest} = item;

    newArr.push(rest)
  });

  //Transform array
  newArr = newArr.map(item => {
    return {
      name: item.name[0] + item.name.substring(1).toLowerCase(),
      url: "http://" + item.url,
      description: item.description.length > 15 ? item.description.substr(0, 15) + '...' : item.description,
      date: moment(new Date(item.date)).format('YYYY/MM/DD HH:mm'),
      params: item.params.status + '=>' + item.params.progress,
      isVisible: item.params.status
    }
  });

  //Return visible objects
  newArr = newArr.filter(item => item.isVisible == true);

  //Print result
  printResult(newArr);
}

function printResult(result) {
  console.log(result);
}