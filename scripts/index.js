//константы для изменения данных профиля
const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
const form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//функции для изменения данных профиля
function openPopup() {
    overlay.classList.add(overlayActiveClass);
    document.body.style.overflow = 'hidden';
}
function closePopup() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
}

//слушатель событий для кнопки изменения данных профиля
buttonProfileInfoEdit.addEventListener('click', (event) => {
    openPopup();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

//слушатель событий для крестика попапа изменения данных профиля
buttonClose.addEventListener('click', () => {
    closePopup();
});

//создание функции для ввода новых данных профиля
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

//слушатель событий для кноки "сохранить" попапа редактирования профиля
form.addEventListener('submit', formSubmitHandler);

//константы для добавления новых карточек
const buttonAddElement = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popupAdd__close-btn');
const overlayAdd = document.querySelector('.overlayAdd');
const overlayAddActiveClass = 'overlayAdd_active';
const formAdd = document.querySelector('.popupAdd__container');
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

//функции для попапа добавления карточек
function openPopupAdd() {
    overlayAdd.classList.add(overlayAddActiveClass);
    document.body.style.overflow = 'hidden';
}
function closePopupAdd() {
    overlayAdd.classList.remove(overlayAddActiveClass);
    document.body.style.overflow = '';
}

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', (event) => {
    openPopupAdd();
});

//слушатель событий для закрытия попапа добавления карточек
buttonCloseAdd.addEventListener('click', (event) => {
    closePopupAdd();
});

//константы открытия модального окна
const overlayModal = document.querySelector('.overlayModal');
const overlayModalActiveClass = 'overlayModal_active';
const modalClose = document.querySelector('.modalWindow__close-btn');
const imageModal = document.querySelector('.modalWindow__image');
const titleModal = document.querySelector('.modalWindow__title');

//функции для модальных окон
function openPopupModal() {
    overlayModal.classList.add(overlayModalActiveClass);
    document.body.style.overflow = 'hidden';
}
function closePopupModal() {
    overlayModal.classList.remove(overlayModalActiveClass);
    document.body.style.overflow = '';
}

//функция для добавления карточек
function addPicture(nameValue, imageValue) {
    //получаем содержимое темплейта обращаясь к его свойству content и клонируем содержимое тега темплейт
    const PictureTemplate = document.querySelector('#add-picture-template').content;
    const PictureElement = PictureTemplate.querySelector('.element').cloneNode(true);
    const TitleElement = PictureElement.querySelector('.element__title');
    const ImageElement = PictureElement.querySelector('.element__image');
    const elementLike = PictureElement.querySelector('.element__like');
    const elementTrash = PictureElement.querySelector('.element__trash');

    TitleElement.textContent = nameValue;
    ImageElement.src = imageValue;

    //нажатие лайка
    elementLike.addEventListener('click', (event) => {
        event.target.classList.toggle('element__like_active');
    });

    //удаление карточки
    elementTrash.addEventListener('click', (event) => {
        event.target.closest('.element').remove();
    });

    //вызов модального окна
    ImageElement.addEventListener('click', () => {
        openPopupModal();
        imageModal.src = imageValue;
        titleModal.textContent = nameValue;
    });

    //закрытие модального окна
    modalClose.addEventListener('click', () => {
        closePopupModal();
    });

    //отображаем на странице карточки
    elementsContainer.prepend(PictureElement);
}

initialCards.forEach(item => {
    addPicture(item.name, item.link);
});

//добавление новой карточки на страницу
function formAddSubmitHandler(event) {
    event.preventDefault();
    let nameAddInput = document.querySelector('.popupAdd__input_type_name');
    let imageAddInput = document.querySelector('.popupAdd__input_type_image');
    addPicture(nameAddInput.value, imageAddInput.value);
    closePopupAdd();
}

formAdd.addEventListener('submit', formAddSubmitHandler);