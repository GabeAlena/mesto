// Класс который отвечает за открытие и закрытие попапа. Принимает в конструтор селектор попапа
export default class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
    };

    //Содержит публичные метод open, close которые отвечают за открытие и закрытие попапа
    open() {
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
        if (event.target.classList.contains('popup_active') || event.target.classList.contains('popup__close-btn')) {
            this.close();
        };
    };

    //Содержит публичный метод который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popup.addEventListener('click', this._handleOverlayAndClickClose);
    };
};