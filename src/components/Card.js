// Необходимо связать класс Кард с попапом. Нужно сделать так, чтобы Кард принимал в конструтор функцию handleCardClick
//Эта функция должна открывать попап с картинкой при клике на карточку
export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const pictureElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);

          return pictureElement;
    }
    
    createCard() {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._elementImage = this._element.querySelector('.element__image');
        
        this._fillCard();
        this._setEventListeners();
        return this._element;
    };

    _fillCard() {
        const titleElement = this._element.querySelector('.element__title');
        const imageElement = this._element.querySelector('.element__image');
    
        titleElement.textContent = this._name;
        imageElement.src = this._link;
        imageElement.alt = this._name;
    };

    _setEventListeners() {
        // слушатели для кнопки лайка, мусорки и картинки
        this._elementLike.addEventListener('click', this._clickLike);
        this._elementTrash.addEventListener('click', this._deleteCard);
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    _deleteCard = () => {
        this._element.remove();
        this._element = null;
    };
     
    _clickLike = () => {
        this._elementLike.classList.toggle('element__like_active');
    };
}