(function () {
  const add = document.querySelector("#add"),
        count = document.querySelector('#count'),
        sort = document.querySelector('#sort'),
        container = document.querySelector('#content');
  let currentData = [];

  if (localStorage.getItem('sort')) {
    sort.value = localStorage.getItem('sort');
  }

  updateCounter();

  function init(e) {
    e.preventDefault();

    //Add Item
    addItem(data);

    //Sort Items;
    sortData(sort.value);

    //Render Data
    renderData(currentData);

    //Count
    updateCounter();
  }

  function addItem(data) {
    let index = data.findIndex(item => !currentData.includes(item));
    if (index !== -1) {
      currentData.push(data[index]);
    } else {
      $('#finishMsg').modal('show');
      add.setAttribute('disabled', 'disabled');
    }
  }

  function sortData(sortType) {
    switch (sortType) {
      case "nameAsc":
        currentData.sort((a, b) => {
          let aName = a.name.toLowerCase(),
            bName = b.name.toLowerCase();
          if (aName < bName) {
            return 1
          }
          if (aName > bName) {
            return -1
          }
          return 0
        });
        break;
      case "nameDesc":
        currentData.sort((a, b) => {
          let aName = a.name.toLowerCase(),
            bName = b.name.toLowerCase();
          if (aName > bName) {
            return 1
          }
          if (aName < bName) {
            return -1
          }
          return 0
        });
        break;
      case "dateAsc":
        currentData.sort((a, b) => {
          if (a.date > b.date) {
            return 1
          }
          if (a.date < b.date) {
            return -1
          }
          return 0
        });
        break;
      case "dateDesc":
        currentData.sort((a, b) => {
          if (a.date < b.date) {
            return 1
          }
          if (a.date > b.date) {
            return -1
          }
          return 0
        });
        break;
      default:
        return false
    }
  }

  function renderData() {
    let html = '';

    currentData.forEach((item) => {
      html += `<div class="col-md-3" key="${item.id}">
                  <div class="card">
                    <img src="${item.url}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                      <p class="card-text">${moment(new Date(item.date)).format('YYYY/MM/DD HH:mm')}</p>
                      <a href="javascript:;" title="Удалить" class="btn btn-danger">Удалить</a>
                    </div>
                  </div>
               </div>`;
    });

    container.innerHTML = `<div class="row">${html}</div>`;
  }

  function updateCounter() {
    count.innerText = data.length - currentData.length;
  }

  //Listeners
  //Add button
  add.addEventListener("click", init);

  //Remove button
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains('btn-danger')) {
      let index = currentData.findIndex(item => item.id === Number(e.target.closest('[key]').getAttribute('key')));

      currentData.splice(index, 1);

      renderData();

      if (add.getAttribute('disabled') === 'disabled') {
        add.removeAttribute('disabled');
      }

      updateCounter();
    }
  });

  //Sort select
  sort.addEventListener('change', (e) => {
    let sortType = e.target.value;

    localStorage.setItem('sort', sortType);

    sortData(sortType);

    renderData(currentData);
  });

})();