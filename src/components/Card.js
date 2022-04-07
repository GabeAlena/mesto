export class Card {
    constructor(data, card, handleCardClick, handleLikeClick, handleDeleteClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._card = card;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
    };

    _getTemplate() {
        const pictureElement = document
          .querySelector(this._card)
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
        this._likeCountElement.textContent = this._likes.length;

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
        this._elementTitle = this._element.querySelector('.element__title');
        this._likeCountElement = this._element.querySelector('.element__numberLike');
        
        this._fillCard();
        this._setEventListeners();

        this.setLikes(this._likes);

        if(this._ownerId !== this._userId) {
            this._elementTrash.style.display = 'none';
        }
        return this._element;
    };

    _fillCard() {    
        this._elementTitle.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
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