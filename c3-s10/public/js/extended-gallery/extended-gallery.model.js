export default class ExtendedGalleryModel {
    static async operateData (method, url = '', data = {}) {
        let params;
        switch (method) {
            case 'POST':
            case 'PUT':
                params = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                break;
            default:
                params = {}
        }
        const res = await fetch(url, {
            method: method,
            ...params
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json();
    }

    getCarInfo (id) {
        return ExtendedGalleryModel.operateData('GET','/cars/' + id).then(res => res);
    };

    addNewCar (data) {
        return ExtendedGalleryModel.operateData('POST','/cars/', data).then(res => res);
    };

    updateCar (id, data) {
        return ExtendedGalleryModel.operateData('PUT','/cars/' + id, data).then(res => res);
    };

    async removeCar (id) {
        return ExtendedGalleryModel.operateData('DELETE','/cars/' + id);
    };
}