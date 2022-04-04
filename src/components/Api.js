class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    //загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //редактирование профиля
    editProfileData(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //добавление новой карточки
    postNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //отображение количества лайков карточки
    getLikes() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //постановка и снятие лайка
    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };

    //обновление аватара пользователя
    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    };
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: 'd858efb2-1413-409e-a417-bed1a584b8e7',
        'Content-Type': 'application/json'
    }
});