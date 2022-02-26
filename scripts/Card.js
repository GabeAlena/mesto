import { openPopup } from './utils.js';
import { imagePopup, popupPicture, titleModal, imageNameModal } from './constants.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._pictureTemplate = document.querySelector(cardSelector).content.querySelector('.element');
    };

    _deleteCard = () => {
        this._pictureElement.remove();
    };
     
    _clickLike = () => {
        this._elementLike.classList.toggle('element__like_active');
    };

    _showImage = () => {
        popupPicture.src = this._link;
        titleModal.textContent = this._name;
        imageNameModal.alt = this._name;
        openPopup(imagePopup);
    };

    _setEventListeners() {
        // слушатели для кнопки лайка, мусорки и картинки
        this._elementLike.addEventListener('click', this._clickLike);
        this._elementTrash.addEventListener('click', this._deleteCard);
        this._elementImage.addEventListener('click', this._showImage);
    };

    _fillCard() {
        const titleElement = this._pictureElement.querySelector('.element__title');
        const imageElement = this._pictureElement.querySelector('.element__image');
        const imageNameElement = this._pictureElement.querySelector('.element__image');
    
        titleElement.textContent = this._name;
        imageElement.src = this._link;
        imageNameElement.alt = this._name;
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