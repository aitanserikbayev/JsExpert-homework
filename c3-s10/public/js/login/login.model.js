export default class LoginModel {
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

    getErrorMessages () {
        return LoginModel.operateData('GET', '/errorMessagesList').then(res => res).then(res => res);
    };

    getAccessData () {
        return LoginModel.operateData('GET', '/access').then(res => res).then(res => res);
    }
}