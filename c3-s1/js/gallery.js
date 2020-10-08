let BaseGallery = function () {
  this.addBtn = document.querySelector("#add");
  this.countLabel = document.querySelector('#count');
  this.sortSelect = document.querySelector('#sort');
  this.container = document.querySelector('#content');
  this.currentData = [];
};

BaseGallery.prototype = {
  initComponent: function () {
    this.checkLocalSortType();
    this.checkSavedCurrentData();
    this.initListeners();
  },

  sortAndUpdate: function (e) {
    let sortType = e.target.value;

    localStorage.setItem('sort', sortType);

    this.sortData(sortType);

    this.renderData();
  },

  sortData: function (sortType) {
    switch (sortType) {
      case "nameAsc":
        this.sortByName(this.currentData, 1);
        break;
      case "nameDesc":
        this.sortByName(this.currentData, -1);
        break;
      case "dateAsc":
        this.sortByDate(this.currentData, 1);
        break;
      case "dateDesc":
        this.sortByDate(this.currentData, -1);
        break;
      default:
        return false
    }
  },

  renderData: function () {
    let html = '';

    this.currentData.forEach((item) => {
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

    this.container.innerHTML = `<div class="row">${html}</div>`;
  },

  sortByName: function (data, direction) {
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
  },

  sortByDate: function (data, direction) {
    data.sort((a, b) => {
      if (a.date > b.date) {
        return direction
      }
      if (a.date < b.date) {
        return -direction
      }
      return 0
    });
  },

  checkLocalSortType: function () {
    if (localStorage.getItem('sort')) {
      this.sortSelect.value = localStorage.getItem('sort');
    }
  },

  checkSavedCurrentData: function () {
    let savedCurrentData = localStorage.getItem('currentData');
    if (savedCurrentData) {
      this.currentData = JSON.parse(savedCurrentData);
      this.sortData(this.sortSelect.value);
      this.renderData(this.currentData);
    }
  },

  initListeners: function () {
    //Sort select
    this.sortSelect.addEventListener('change', this.sortAndUpdate.bind(this));
  }
};

let ExtendedGallery = function () {
  BaseGallery.apply(this);
};

ExtendedGallery.prototype = {

  initComponent: function () {
    BaseGallery.prototype.initComponent.apply(this);

    this.updateCounter();
    this.initExtListeners();
  },

  addAndUpdate: function (e) {
    e.preventDefault();

    //Add Item
    this.addItem(data);

    //Save currentData to localStorage
    this.saveDataToLocalStorage();

    //Sort Items;
    this.sortData(this.sortSelect.value);

    //Render Data
    this.renderData(this.currentData);

    //Count
    this.updateCounter();
  },

  removeAndUpdate: function (e) {
    if (e.target.classList.contains('btn-danger')) {
      this.currentData = this.currentData.filter(item => {
        return item.id !== Number(e.target.closest('[key]').getAttribute('key'));
      });

      this.saveDataToLocalStorage();

      this.renderData();

      this.enableBtn(this.addBtn);

      this.updateCounter();
    }
  },

  addItem: function (data) {
    let index = data.findIndex(item => !this.currentData.some(item2 => item.id === item2.id));
    if (index !== -1) {
      this.currentData.push(data[index]);
    } else {
      $('#finishMsg').modal('show');
      this.disableBtn(this.addBtn);
    }
  },

  saveDataToLocalStorage: function () {
    localStorage.setItem('currentData', JSON.stringify(this.currentData));
  },

  enableBtn: function (btn) {
    if (btn.getAttribute('disabled') === 'disabled') {
      btn.removeAttribute('disabled');
    }
  },

  disableBtn: function (btn) {
    btn.setAttribute('disabled', 'disabled');
  },

  updateCounter: function () {
    this.countLabel.innerText = data.length - this.currentData.length;
  },

  initExtListeners: function () {
    //Add button
    this.addBtn.addEventListener("click", this.addAndUpdate.bind(this));

    //Remove button
    this.container.addEventListener("click", this.removeAndUpdate.bind(this));
  }
};

service.inheritance(BaseGallery, ExtendedGallery);