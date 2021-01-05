class BaseGallery {
    constructor() {
        this.sortSelect = document.querySelector('#sort');
        this.container = document.querySelector('#content');
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

        this.container.innerHTML = `<div class="row">${html}</div>`;
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
            this.sortSelect.value = localStorage.getItem('sort');
        }
    };

    initListeners() {
        //Sort select
        this.sortSelect.addEventListener('change', this.sortAndUpdate.bind(this));
    };

    async initComponent() {
        try {
            this.currentData = await service.getAllCars();
            this.checkLocalSortType();
            this.sortData(this.sortSelect.value);
            this.renderData(this.currentData);
            this.initListeners();
        } catch (e) {
            console.error(e);
        }
    };
}

class ExtendedGallery extends BaseGallery {
    constructor() {
        super();
        this.addBtn = document.querySelector("#add");
        this.editBtn = document.querySelector("#edit");
    }

    async addAndUpdate(e) {
        e.preventDefault();

        //Add Item
        await this.addItem(e);

        await this.update();
    };

    addItem(e) {
        let btn = e.target,
            form = btn.closest('form'),
            imageInput = form.querySelector('[name="image"]'),
            nameInput = form.querySelector('[name="name"]'),
            descriptionInput = form.querySelector('[name="description"]'),
            formData = {
                id: Math.max(...this.currentData.map(item => item.id)) + 1,
                url: imageInput.value,
                name: nameInput.value,
                description: descriptionInput.value,
                date: +new Date()
            };

        //Check required fields
        ExtendedGallery.checkRequiredFields(form);

        //Check for invalid classes
        if (!form.querySelector('.is-invalid')) {
            service.addNewCar(formData)
                .then(() => {
                    service.hideModal('#' + form.closest('.modal').id);
                })
                .catch(e => console.error(e));
        }
    };

    async removeAndUpdate(e) {
        if (e.target.classList.contains('btn-danger')) {
            e.preventDefault();
            let id = Number(e.target.closest('[key]').getAttribute('key'));

            //Remove item
            await service.removeCar(id);

            await this.update();
        }
    };

    static async openEditModal(e) {
        if (e.target.classList.contains('btn-outline-secondary')) {
            e.preventDefault();
            let btn = e.target,
                id = Number(btn.closest('[key]').getAttribute('key')),
                target = await service.getCarInfo(id),
                modalId = '#editCar',
                modalEl = document.querySelector(modalId),
                form = modalEl.querySelector('form'),
                idInput = form.querySelector('[name="id"]'),
                imageInput = form.querySelector('[name="image"]'),
                nameInput = form.querySelector('[name="name"]'),
                descriptionInput = form.querySelector('[name="description"]');

            idInput.value = target.id;
            imageInput.value = target.url;
            nameInput.value = target.name;
            descriptionInput.value = target.description;
            service.showModal(modalId);
        }
    };

    async editAndUpdate(e) {
        e.preventDefault();

        //Edit item
        await this.editItem(e);

        await this.update();
    }

    editItem(e) {
        let btn = e.target,
            form = btn.closest('form'),
            idInput = form.querySelector('[name="id"]'),
            imageInput = form.querySelector('[name="image"]'),
            nameInput = form.querySelector('[name="name"]'),
            descriptionInput = form.querySelector('[name="description"]'),
            formData = {
                id: idInput.value,
                url: imageInput.value,
                name: nameInput.value,
                description: descriptionInput.value,
                date: +new Date()
            };

        //Check required fields
        ExtendedGallery.checkRequiredFields(form);

        //Check for invalid classes
        if (!form.querySelector('.is-invalid')) {
            service.updateCar(idInput.value, formData)
                .then(() => {
                    service.hideModal('#' + form.closest('.modal').id);
                })
                .catch(e => console.error(e));
        }
    }

    static checkRequiredFields(form) {
        form.querySelectorAll('[required]').forEach(el => {
            if (!el.value) {
                el.classList.add('is-invalid')
            } else {
                el.classList.remove('is-invalid')
            }
        });
    }

    async update() {
        //Get new data
        this.currentData = await service.getAllCars();

        //Sort Items;
        this.sortData(this.sortSelect.value);

        //Render Data
        this.renderData(this.currentData);
    }

    initExtListeners() {
        //Add button
        this.addBtn.addEventListener("click", this.addAndUpdate.bind(this));

        //Edit button
        this.editBtn.addEventListener("click", this.editAndUpdate.bind(this));

        //Remove button
        this.container.addEventListener("click", this.removeAndUpdate.bind(this));
        this.container.addEventListener("click", ExtendedGallery.openEditModal.bind(this));
    };

    async initComponent() {
        await super.initComponent();
        this.initExtListeners();
    };
}