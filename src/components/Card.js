export class Card {
    constructor(data, cardSelector, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    };

    _getTemplate() {
        const pictureElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);

          return pictureElement;
    }
    
    isLiked = () => {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        
        return userHasLikedCard;
    }

    setLikes = (newLikes) => {
        this._likes = newLikes;
        const likeCountElement = this._element.querySelector('.element__numberLike');
        likeCountElement.textContent = this._likes.length;

        if(this.isLiked()) {
            this._handleLikeIcon();
        } else {
            this._handleDislikeIcon();
        }
    }

    createCard() {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._elementImage = this._element.querySelector('.element__image');
        
        this._fillCard();
        this._setEventListeners();

        this.setLikes(this._likes);
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
        this._elementLike.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });
        this._elementTrash.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    deleteCard() {
        this._element.remove();
        this._element = null;
    };
     
    _handleLikeIcon = () => {
        this._elementLike.classList.add('element__like_active');
    };

    _handleDislikeIcon = () => {
        this._elementLike.classList.remove('element__like_active');
    }
}

/*// Необходимо связать класс Кард с попапом. Нужно сделать так, чтобы Кард принимал в конструтор функцию handleCardClick
//Эта функция должна открывать попап с картинкой при клике на карточку
export class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    };

    _getTemplate = () => {
        const pictureElement = document
          .querySelector(this._cardSelector)
          .content
          .querySelector('.element')
          .cloneNode(true);

          return pictureElement;
    }

    isLiked = () => {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        
        return userHasLikedCard;
    }

    setLikes = (newLikes) => {
        this._likes = newLikes;
        const likeCountElement = this._element.querySelector('.element__numberLike');
        likeCountElement.textContent = this._likes.length;

        if(this.isLiked()) {
            this._handleLikeIcon();
        } else {
            this._handleDislikeIcon();
        }
    }
    
    createCard = () => {
        this._element = this._getTemplate();
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._elementImage = this._element.querySelector('.element__image');
        
        this._fillCard();
        this._setEventListeners();

        this.setLikes(this._likes);

        if(this._ownerId !== this._userId) {
            this._element.querySelector('.element__trash').style.display = 'none';
        }
        return this._element;
    };

    _fillCard = () => {
        const titleElement = this._element.querySelector('.element__title');
        const imageElement = this._element.querySelector('.element__image');
    
        titleElement.textContent = this._name;
        imageElement.src = this._link;
        imageElement.alt = this._name;
    };

    _setEventListeners() {
        // слушатели для кнопки лайка, мусорки и картинки
        this._elementLike.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });
        this._elementTrash.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    };

    _handleLikeIcon = () => {
        this._elementLike.classList.add('element__like_active');
    };

    _handleDislikeIcon = () => {
        this._elementLike.classList.remove('element__like_active');
    }
}*/