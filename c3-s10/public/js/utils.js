export default class Utils {
    static hideModal (modalId) {
        $(modalId).modal('hide');
    };

    static showModal (modalId) {
        $(modalId).modal('show');
    };

    static objToArray (obj) {
        return Array.prototype.slice.call(obj);
    };

    static showView(viewEl) {
        viewEl.classList.remove('d-none');
    }

    static hideAllViews(viewsEl) {
        viewsEl.forEach(el => el.classList.add('d-none'));
    }

    static addClass (domEl, className) {
        domEl.classList.add(className);
    };

    static removeClass (domEl, className) {
        domEl.classList.remove(className);
    };
}