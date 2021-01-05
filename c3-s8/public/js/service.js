function DummyService() {
    this.setLogAndPass = (access) => {
        localStorage.setItem('access', JSON.stringify(access))
    }
}

const DataService = function () {
    this.getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json();
    };

    this.postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json();
    };

    this.putData = async (url, data) => {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json();
    };

    this.removeData = async (url) => {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return res.json();
    };

    this.getAllCars = () => {
        return this.getData('/cars').then(res => this.transformData(res));
    };

    this.getCarInfo = (id) => {
        return this.getData('/cars/' + id).then(res => res);
    };

    this.addNewCar = (data) => {
        return this.postData('/cars', data).then(res => res);
    };

    this.updateCar = (id, data) => {
        return this.putData('/cars/' + id, data).then(res => res);
    };

    this.removeCar = async (id) => {
        return this.removeData('/cars/' + id);
    };

    this.getErrorMessages = () => {
        return new Promise((resolve, reject) => {
            let url = `/errorMessagesList`;
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status !== 200) {
                    reject(xhr.status);
                } else {
                    resolve(xhr.response);
                }
            };

            xhr.onerror = function () {
                console.log('Request error');
            };

            xhr.send();
        });
    };

    this.hideModal = (modalId) => {
        $(modalId).modal('hide');
    };

    this.showModal = (modalId) => {
        $(modalId).modal('show');
    };

    this.transformData = (data) => {
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
    }
};