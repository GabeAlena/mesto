//константы для изменения данных профиля
const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
const form = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//функции для изменения данных профиля
function openPopup() {
    overlay.classList.add(overlayActiveClass);
    document.body.style.overflow = 'hidden';
}
function closePopup() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
}
function changeProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

//слушатель событий для кнопки изменения данных профиля
buttonProfileInfoEdit.addEventListener('click', () => {
    changeProfile();
    openPopup();
});

//слушатель событий для крестика попапа изменения данных профиля
buttonClose.addEventListener('click', () => {
    closePopup();
});

//создание функции для ввода новых данных профиля
function SubmitHandlerForm(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

//слушатель событий для кноки "сохранить" попапа редактирования профиля
form.addEventListener('submit', SubmitHandlerForm);

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
const imageNameModal = document.querySelector('.modalWindow__image');

function openPopupModal() {
    overlayModal.classList.add(overlayModalActiveClass);
    document.body.style.overflow = 'hidden';
}
function closePopupModal() {
    overlayModal.classList.remove(overlayModalActiveClass);
    document.body.style.overflow = '';
}
function deleteCard(event) {
    event.target.closest('.element').remove();
}
function clickLike(event) {
    event.target.classList.toggle('element__like_active');
}

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
    elementLike.addEventListener('click', (event) => {
        clickLike(event);
    });

     //удаление карточки
    elementTrash.addEventListener('click', (event) => {
        deleteCard(event);
    });

    //вызов модального окна
    imageElement.addEventListener('click', () => {
        imageModal.src = link;
        titleModal.textContent = name;
        imageNameModal.alt = name;
        openPopupModal();
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
    closePopupModal();
});

//добавление новой карточки на страницу
function submitHandlerFormAdd(event) {
    event.preventDefault();
    const nameAddInput = document.querySelector('.popupAdd__input_type_name');
    const imageAddInput = document.querySelector('.popupAdd__input_type_image');
    const card = {
        name: nameAddInput.value,
        link: imageAddInput.value
    };
    addCard(elementsContainer, card);
    closePopupAdd();
}

formAdd.addEventListener('submit', submitHandlerFormAdd);