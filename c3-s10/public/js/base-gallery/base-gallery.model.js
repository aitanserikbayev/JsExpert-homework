export default class BaseGalleryModel {
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

    getAllCars () {
        return BaseGalleryModel.operateData('GET','/cars').then(res => BaseGalleryModel.transformData(res));
    };

    static transformData (data) {
        return (
            data.map(item => {
                return {
                    id: item.id,
                    url: item.url,
                    name: item.name,
                    description: item.description.length > 25 ? item.description.substr(0, 25) + '...' : item.description,
                    date: item.date
                }
            })
        )
    };
}