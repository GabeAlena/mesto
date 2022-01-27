//константы для изменения данных профиля
const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_profile');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-btn');
const popupActiveClass = 'popup_active';
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const jobInput = popupProfile.querySelector('.popup__input_type_job');
const openPopup = (element) => {
    element.classList.add(popupActiveClass);
    document.body.style.overflow = 'hidden';
};

const closePopup = (element) => {
    element.classList.remove(popupActiveClass);
    document.body.style.overflow = '';
};

//константы открытия модального окна
const popupModal = document.querySelector('.popup_modal');
const modalClose = popupModal.querySelector('.popup__close-btn');
const imageModal = popupModal.querySelector('.popup__image-modal');
const titleModal = popupModal.querySelector('.popup__title-modal');
const imageNameModal = popupModal.querySelector('.popup__title-modal');

//константы для добавления новых карточек
const buttonAddElement = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const buttonCloseAdd = popupCards.querySelector('.popup__close-btn');
const formCards = popupCards.querySelector('.popup__form');
const elementsContainer = document.querySelector('.elements-container');
const initialCards = [
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

function changeProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

//слушатель событий для кнопки изменения данных профиля
buttonProfileInfoEdit.addEventListener('click', () => {
    changeProfile();
    openPopup(popupProfile);
});

//слушатель событий для крестика попапа изменения данных профиля
buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupProfile);
});

//создание функции для ввода новых данных профиля
function submitHandlerForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

//слушатель событий для кноки "сохранить" попапа редактирования профиля
formProfile.addEventListener('submit', submitHandlerForm);

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', () => {
    openPopup(popupCards);
});

//слушатель событий для закрытия попапа добавления карточек
buttonCloseAdd.addEventListener('click', () => {
    closePopup(popupCards);
});

function deleteCard(event) {
    event.target.closest('.element').remove();
};

function clickLike(event) {
    event.target.classList.toggle('element__like_active');
};

//функция для создания карточки
function createCard(name, link) {
    //получаем содержимое темплейта обращаясь к его свойству content и клонируем содержимое тега темплейт
    const pictureTemplate = document.querySelector('#add-picture-template').content;
    const pictureElement = pictureTemplate.querySelector('.element').cloneNode(true);
    const titleElement = pictureElement.querySelector('.element__title');
    const imageElement = pictureElement.querySelector('.element__image');
    const elementLike = pictureElement.querySelector('.element__like');
    const elementTrash = pictureElement.querySelector('.element__trash');
    const imageNameElement = pictureElement.querySelector('.element__image');

    titleElement.textContent = name;
    imageElement.src = link;
    imageNameElement.alt = name;

    //нажатие лайка
    elementLike.addEventListener('click', clickLike);

     //удаление карточки
    elementTrash.addEventListener('click', deleteCard);

    //вызов модального окна
    imageElement.addEventListener('click', () => {
        imageModal.src = link;
        titleModal.textContent = name;
        imageNameModal.alt = name;
        openPopup(popupModal);
    });
    
    return pictureElement;
};

//функция добавления карточки в контейнер
function addCard(elementsContainer, pictureElement) {
    elementsContainer.prepend(createCard(pictureElement.name, pictureElement.link));
};

initialCards.forEach(function(pictureElement) {
    addCard(elementsContainer, pictureElement);
});

//закрытие модального окна
modalClose.addEventListener('click', () => {
    closePopup(popupModal);
});

//добавление новой карточки на страницу
function submitHandlerFormAdd(event) {
    event.preventDefault();
    const nameAddInput = document.querySelector('.popup__input_type_nameimage');
    const imageAddInput = document.querySelector('.popup__input_type_image');
    const card = {
        name: nameAddInput.value,
        link: imageAddInput.value
    };
    addCard(elementsContainer, card);
    closePopup(popupCards);
};

formCards.addEventListener('submit', submitHandlerFormAdd);