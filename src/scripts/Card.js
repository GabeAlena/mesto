// Необходимо связать класс Кард с попапом. Нужно сделать так, чтобы Кард принимал в конструтор функцию handleCardClick
//Эта функция должна открывать попап с картинкой при клике на карточку

import Popup from './Popup.js';
import { imagePopup, popupPicture, titleModal } from './constants.js';

export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._pictureTemplate = document.querySelector(cardSelector).content.querySelector('.element');
        this._handleCardClick = handleCardClick;
    };

    _deleteCard = () => {
        this._pictureElement.remove();
        this._pictureElement = null;
    };
     
    _clickLike = () => {
        this._elementLike.classList.toggle('element__like_active');
    };

    _handleCardClick = () => {
        popupPicture.src = this._link;
        titleModal.textContent = this._name;
        titleModal.alt = this._name;
        open();
    };

    _setEventListeners() {
        // слушатели для кнопки лайка, мусорки и картинки
        this._elementLike.addEventListener('click', this._clickLike);
        this._elementTrash.addEventListener('click', this._deleteCard);
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    _fillCard() {
        const titleElement = this._pictureElement.querySelector('.element__title');
        const imageElement = this._pictureElement.querySelector('.element__image');
    
        titleElement.textContent = this._name;
        imageElement.src = this._link;
        imageElement.alt = this._name;
    };

    createCard() {
        //получаем содержимое темплейта обращаясь к его свойству content и клонируем содержимое тега темплейт
        this._pictureElement = this._pictureTemplate.cloneNode(true);

        this._elementLike = this._pictureElement.querySelector('.element__like');
        this._elementTrash = this._pictureElement.querySelector('.element__trash');
        this._elementImage = this._pictureElement.querySelector('.element__image');
        
        this._fillCard();
        this._setEventListeners();

        return this._pictureElement;
    };
}