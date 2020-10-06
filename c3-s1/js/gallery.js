/* 
*  Схематическое изображение класса Галереи
*/

let BaseGallery = function () {
  const addBtn = document.querySelector("#add"),
    countLabel = document.querySelector('#count'),
    sortSelect = document.querySelector('#sort'),
    container = document.querySelector('#content');
  let currentData = [];

  function addAndUpdate(e) {
    e.preventDefault();

    //Add Item
    addItem(data);

    //Save currentData to localStorage
    saveDataToLocalStorage();

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

      saveDataToLocalStorage();

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
    let index = data.findIndex(item => !currentData.some(item2 => item.id === item2.id));
    if (index !== -1) {
      currentData.push(data[index]);
    } else {
      $('#finishMsg').modal('show');
      disableBtn(addBtn);
    }
  }

  function saveDataToLocalStorage() {
    localStorage.setItem('currentData', JSON.stringify(currentData));
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
        return direction
      }
      if (aName > bName) {
        return -direction
      }
      return 0
    });
  }

  function sortByDate(data, direction) {
    data.sort((a, b) => {
      if (a.date > b.date) {
        return direction
      }
      if (a.date < b.date) {
        return -direction
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

  function updateCounter() {
    countLabel.innerText = data.length - currentData.length;
  }

  this.checkLocalSortType = () => {
    if (localStorage.getItem('sort')) {
      sortSelect.value = localStorage.getItem('sort');
    }
  };

  this.checkSavedCurrentData = () => {
    let savedCurrentData = localStorage.getItem('currentData');
    if (savedCurrentData) {
      currentData = JSON.parse(savedCurrentData);
      sortData(sortSelect.value);
      renderData(currentData);
    }
  };

  this.updateCounter = () => {
    updateCounter();
  };

  this.initListeners = () => {
    //Add button
    addBtn.addEventListener("click", addAndUpdate);

    //Remove button
    container.addEventListener("click", removeAndUpdate);

    //Sort select
    sortSelect.addEventListener('change', sortAndUpdate);
  };
};

BaseGallery.prototype = {
  initComponent: function () {
    this.checkLocalSortType();
    this.checkSavedCurrentData();
    this.updateCounter();
    this.initListeners();
  }
};


// let ExtendedGallery = function () {
//   BaseGallery.apply(this);
//   this.property = {};
// };
//
// ExtendedGallery.prototype = {
//
//   initComponent: function () {
//     BaseGallery.prototype.initComponent.apply(this);
//   },
//
//   addImage: function () {
//     // новый метод которо нет у родителя
//   }
// };

// код функции наследования можно найти архиве, который содержится 
// в материалах к сессии 29 (практический пример)
// service.inheritance(BaseGallery, ExtendedGallery);