export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

//константы модального окна, большой фотографии
export const imagePopup = document.querySelector('.popup_modal');
export const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');
export const popupPicture = imagePopup.querySelector('.popup__image-modal');
export const titleModal = imagePopup.querySelector('.popup__title-modal');

//константы данных профиля
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');

//константы данных профиля в попапе
export const popupProfile = document.querySelector('.popup_profile');
export const buttonCloseProfile = popupProfile.querySelector('.popup__close-btn');
export const popupActiveClass = 'popup_active';
export const formProfile = popupProfile.querySelector('.popup__form');
export const nameInput = popupProfile.querySelector('.popup__input_type_name');
export const jobInput = popupProfile.querySelector('.popup__input_type_job');

//константы карточек
export const buttonAddElement = document.querySelector('.profile__add-button');

//константы карточек при добавлении
export const elementsContainer = document.querySelector('.elements-container');

//константы карточек в попапе
export const popupCards = document.querySelector('.popup_cards');
export const buttonCloseAdd = popupCards.querySelector('.popup__close-btn');
export const formCards = popupCards.querySelector('.popup__form');
export const cardCreateBtn = popupCards.querySelector('.popup__button');
export const nameAddInput = document.querySelector('.popup__input_type_nameimage');
export const imageAddInput = document.querySelector('.popup__input_type_image');