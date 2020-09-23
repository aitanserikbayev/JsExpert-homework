(function () {
  const addBtn = document.querySelector("#add"),
        countLabel = document.querySelector('#count'),
        sortSelect = document.querySelector('#sort'),
        container = document.querySelector('#content');
  let currentData = [];

  function addAndUpdate(e) {
    e.preventDefault();

    //Add Item
    addItem(data);

    //Sort Items;
    sortData(sortSelect.value);

    //Render Data
    renderData(currentData);

    //Count
    updateCounter();
  }

  function removeAndUpdate(e) {
    if (e.target.classList.contains('btn-danger')) {
      currentData = currentData.filter(item => {
        return item.id !== Number(e.target.closest('[key]').getAttribute('key'));
      });

      renderData();

      enableBtn(addBtn);

      updateCounter();
    }
  }

  function sortAndUpdate(e) {
    let sortType = e.target.value;

    localStorage.setItem('sort', sortType);

    sortData(sortType);

    renderData();
  }

  function addItem(data) {
    let index = data.findIndex(item => !currentData.includes(item));
    if (index !== -1) {
      currentData.push(data[index]);
    } else {
      $('#finishMsg').modal('show');
      disableBtn(addBtn);
    }
  }

  function sortData(sortType) {
    switch (sortType) {
      case "nameAsc":
        sortByName(currentData, 1);
        break;
      case "nameDesc":
        sortByName(currentData, -1);
        break;
      case "dateAsc":
        sortByDate(currentData, 1);
        break;
      case "dateDesc":
        sortByDate(currentData, -1);
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
                      <a href="#" title="Удалить" class="btn btn-danger">Удалить</a>
                    </div>
                  </div>
               </div>`;
    });

    container.innerHTML = `<div class="row">${html}</div>`;
  }

  function sortByName(data, direction) {
    data.sort((a, b) => {
      let aName = a.name.toLowerCase(),
        bName = b.name.toLowerCase();
      if (aName < bName) {
        return 1 * direction
      }
      if (aName > bName) {
        return -1 * direction
      }
      return 0
    });
  }

  function sortByDate(data, direction) {
    data.sort((a, b) => {
      if (a.date > b.date) {
        return 1 * direction
      }
      if (a.date < b.date) {
        return -1 * direction
      }
      return 0
    });
  }

  function enableBtn(btn) {
    if (btn.getAttribute('disabled') === 'disabled') {
      btn.removeAttribute('disabled');
    }
  }

  function disableBtn(btn) {
    btn.setAttribute('disabled', 'disabled');
  }

  function checkLocalStorage() {
    if (localStorage.getItem('sort')) {
      sortSelect.value = localStorage.getItem('sort');
    }
  }

  function updateCounter() {
    countLabel.innerText = data.length - currentData.length;
  }

  //Listeners
  function initListeners() {
    //Add button
    addBtn.addEventListener("click", addAndUpdate);

    //Remove button
    container.addEventListener("click", removeAndUpdate);

    //Sort select
    sortSelect.addEventListener('change', sortAndUpdate);
  }

  initListeners();

  checkLocalStorage();

  updateCounter();
})();