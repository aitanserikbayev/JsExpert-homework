import BaseGalleryView from './base-gallery.view.js'
import BaseGalleryModel from './base-gallery.model.js'

export default class BaseGallery {
    constructor() {
        this.view = new BaseGalleryView();
        this.model = new BaseGalleryModel();
        this.currentData = [];
    }

    sortAndUpdate(e) {
        let sortType = e.target.value;

        localStorage.setItem('sort', sortType);

        this.sortData(sortType);

        this.renderData();
    };

    sortData(sortType) {
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
    };

    renderData() {
        let html = '';

        this.currentData.forEach((item) => {
            html += `<div class="col-md-3" key="${item.id}">
                  <div class="card">
                    <img src="${item.url}" class="card-img-top" alt="${item.name}">
                    <div class="card-body">
                      <h5 class="card-title">${item.name}</h5>
                      <p class="card-text">${item.description}</p>
                      <p class="card-text">${moment(new Date(item.date)).format('YYYY/MM/DD HH:mm')}</p>
                      <a href="#" title="Удалить" class="btn btn-outline-secondary">Изменить</a>
                      <a href="#" title="Удалить" class="btn btn-danger">Удалить</a>
                    </div>
                  </div>
               </div>`;
        });

        this.view.DOMElements.container.innerHTML = `<div class="row">${html}</div>`;
    };

    sortByName(data, direction) {
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
    };

    sortByDate(data, direction) {
        data.sort((a, b) => {
            if (a.date > b.date) {
                return direction
            }
            if (a.date < b.date) {
                return -direction
            }
            return 0
        });
    };

    checkLocalSortType() {
        if (localStorage.getItem('sort')) {
            this.view.DOMElements.sortSelect.value = localStorage.getItem('sort');
        }
    };

    initListeners() {
        //Sort select
        this.view.DOMElements.sortSelect.addEventListener('change', this.sortAndUpdate.bind(this));
    };

    async initComponent() {
        try {
            this.currentData = await this.model.getAllCars();
            this.checkLocalSortType();
            this.sortData(this.view.DOMElements.sortSelect.value);
            this.renderData(this.currentData);
            this.initListeners();
        } catch (e) {
            console.error(e);
        }
    };
}