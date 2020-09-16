(function () {
  const btn = document.getElementById("play"),
    buildTypeEl = document.getElementById('buildType'),
    countEl = document.getElementById('count'),
    buildTitle = document.getElementById('buildTitle'),
    content = document.getElementById('content'),
    newData = transformData(data);

  function init(e) {
    e.preventDefault();

    let buildType = buildTypeEl.value,
      gallery = restrictData(newData, countEl.value);

    //Clear content
    content.innerHTML = '';

    //Set title
    buildTitle.innerText = titles.find(item => item.buildType == buildType).value;

    //Check buildType
    switch (Number(buildType)) {
      case 1:
        buildType1(gallery);
        break;
      case 2:
        buildType2(gallery);
        break;
      case 3:
        buildType3(gallery);
        break;
      default:
        return false
    }
  }

  function buildType1(data) {
    let cardTemplate = '<div class="col-md-3"><div class="card">\n' +
      '  <img src="$url" class="card-img-top" alt="$name">\n' +
      '  <div class="card-body">\n' +
      '    <h5 class="card-title">$name</h5>\n' +
      '    <p class="card-text">$description</p>\n' +
      '    <p class="card-text">$date</p>\n' +
      '  </div>\n' +
      '</div></div>',
      html = '';

    data.forEach(item => {
      html += cardTemplate.replace('$url', item.url)
        .replace(/\$name/g, item.name)
        .replace('$description', item.description)
        .replace('$date', item.date);
    });

    content.innerHTML = `<div class="row">${html}</div>`;
  }

  function buildType2(data) {
    let html = '';

    data.forEach(item => {
      html += `<div class="col-md-3">
                  <div class="card">
                    <img src="${item.url}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                      <p class="card-text">${item.date}</p>
                    </div>
                  </div>
               </div>`;
    });

    content.innerHTML = `<div class="row">${html}</div>`;
  }

  function buildType3(data) {
    let row = document.createElement('div');
    row.classList.add('row');

    data.forEach(item => {
      let cardCol, card, img, cardBody, cardTitle, cardDescription, cardDate;

      cardCol = document.createElement('div');
      cardCol.classList.add('col-md-3');

      card = document.createElement('div');
      card.classList.add('card');

      img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = item.url;
      img.alt = item.name;

      cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerText = item.name;

      cardDescription = document.createElement('p');
      cardDescription.classList.add('card-text');
      cardDescription.innerText = item.description;

      cardDate = document.createElement('p');
      cardDate.classList.add('card-text');
      cardDate.innerText = item.date;

      cardBody.append(cardTitle, cardDescription, cardDate);
      card.append(img, cardBody);
      cardCol.append(card);

      row.append(cardCol);
    });

    content.append(row);
  }

  function transformData(data) {
    return (
      data.filter(item => item.params.status == true)
        .map(item => {
          return {
            url: 'http://' + item.url,
            name: item.name,
            description: item.description.length > 15 ? item.description.substr(0, 25) + '...' : item.description,
            date: moment(new Date(item.date)).format('YYYY/MM/DD HH:mm')
          }
        })
    )
  }

  function restrictData(data, count) {
    return count == "all" ? data : data.slice(0, count);
  }

  btn.addEventListener("click", init);

})();