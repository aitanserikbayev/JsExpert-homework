import BaseGallery from '../base-gallery/base-gallery.controller.js'
import ExtendedGalleryView from "./extended-gallery.view.js";
import ExtendedGalleryModel from "./extended-gallery.model.js";
import utils from '../utils.js'

export default class ExtendedGallery extends BaseGallery {
    constructor() {
        super();
        this.extendedGalleryView = new ExtendedGalleryView();
        this.extendedGalleryModel = new ExtendedGalleryModel();
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
            this.extendedGalleryModel.addNewCar(formData)
                .then(() => {
                    utils.hideModal('#' + form.closest('.modal').id);
                })
                .catch(e => console.error(e));
        }
    };

    async removeAndUpdate(e) {
        if (e.target.classList.contains('btn-danger')) {
            e.preventDefault();
            let id = Number(e.target.closest('[key]').getAttribute('key'));

            //Remove item
            await this.extendedGalleryModel.removeCar(id);

            await this.update();
        }
    };

    static async openEditModal(e) {
        if (e.target.classList.contains('btn-outline-secondary')) {
            e.preventDefault();
            let btn = e.target,
                id = Number(btn.closest('[key]').getAttribute('key')),
                target = await this.extendedGalleryModel.getCarInfo(id),
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
            utils.showModal(modalId);
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
            this.extendedGalleryModel.updateCar(idInput.value, formData)
                .then(() => {
                    utils.hideModal('#' + form.closest('.modal').id);
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
        this.currentData = await this.model.getAllCars();

        //Sort Items;
        this.sortData(this.view.DOMElements.sortSelect.value);

        //Render Data
        this.renderData(this.currentData);
    }

    initExtListeners() {
        //Add button
        this.extendedGalleryView.DOMElements.addBtn.addEventListener("click", this.addAndUpdate.bind(this));

        //Edit button
        this.extendedGalleryView.DOMElements.editBtn.addEventListener("click", this.editAndUpdate.bind(this));

        //Remove button
        this.view.DOMElements.container.addEventListener("click", this.removeAndUpdate.bind(this));
        this.view.DOMElements.container.addEventListener("click", ExtendedGallery.openEditModal.bind(this));
    };

    async initComponent() {
        await super.initComponent();
        this.initExtListeners();
    };
}