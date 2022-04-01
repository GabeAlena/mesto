export class Api {
    constructor(options) {
        //telo constructora
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-38/cards', {
            headers: {
                authorization: 'd858efb2-1413-409e-a417-bed1a584b8e7'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
            //обрабатываем результат
            console.log(result);
        })
        .catch((err) => {
            console.log(err); //выведем ошибку в консоль
        });
    }

    //drugie metody raboty c api
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: 'd858efb2-1413-409e-a417-bed1a584b8e7',
        'Content-Type': 'application/json'
    }
});