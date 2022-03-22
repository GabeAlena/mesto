// Класс который отвечает за открытие и закрытие попапа. Принимает в конструтор селектор попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    };

    //Содержит публичные метод open, close которые отвечают за открытие и закрытие попапа
    open() {
        document.body.style.overflow = 'hidden';
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        document.body.style.overflow = '';
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    //Содержит приватный метод который содержит логику закрытия попапап клавишей Esc
    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        };
    };

    //Модальное окно также закрывается при клике на затемненную область вокруг формы
    _handleOverlayAndClickClose = (event) => {
        if (event.target.classList.contains('popup_active')) {
            this.close();
        };
        if (event.target.classList.contains('popup__close-btn')) {
            this.close();
        };
    };

    //Содержит публичный метод который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popup.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('click', this._handleOverlayAndClickClose);
    };
};

/*import { popupActiveClass } from './constants.js';
export const openPopup = (element) => {
    document.body.style.overflow = 'hidden';
    element.classList.add(popupActiveClass);
    document.addEventListener('keydown', closePopupEsc);
    element.addEventListener('click', handleOverlayClick);
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

function closePopupEsc(event) {
    if (event.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_active')
        closePopup(openedPopup);
    }
}

export const closePopup = (element) => {
    document.body.style.overflow = '';
    element.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closePopupEsc);
    element.removeEventListener('click', handleOverlayClick);
}

//слушатель событий для закрытия попапа добавления карточек по крестику
buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupCards);
});

imagePopupCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
});*/