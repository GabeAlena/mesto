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

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}
function closePopupEsc(event) {
    if (event.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_active')
        closePopup(openedPopup);
    }
}
const openPopup = (element) => {
    document.body.style.overflow = 'hidden';
    element.classList.add(popupActiveClass);
    document.addEventListener('keydown', closePopupEsc);
    element.addEventListener('click', handleOverlayClick);
}
const closePopup = (element) => {
    document.body.style.overflow = '';
    element.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closePopupEsc);
    element.removeEventListener('click', handleOverlayClick);
}

//константы открытия модального окна
const imagePopup = document.querySelector('.popup_modal');
const imagePopupCloseBtn = imagePopup.querySelector('.popup__close-btn');
const popupPicture = imagePopup.querySelector('.popup__image-modal');
const titleModal = imagePopup.querySelector('.popup__title-modal');
const imageNameModal = imagePopup.querySelector('.popup__title-modal');

//константы для добавления новых карточек
const buttonAddElement = document.querySelector('.profile__add-button');
const popupCards = document.querySelector('.popup_cards');
const buttonCloseAdd = popupCards.querySelector('.popup__close-btn');
const formCards = popupCards.querySelector('.popup__form');
const elementsContainer = document.querySelector('.elements-container');
const nameAddInput = document.querySelector('.popup__input_type_nameimage');
const imageAddInput = document.querySelector('.popup__input_type_image');
const cardCreateBtn = popupCards.querySelector('.popup__button');
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
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

//слушатель событий для кноки "сохранить" попапа редактирования профиля
formProfile.addEventListener('submit', handleProfileFormSubmit);

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', () => {
    openPopup(popupCards);
});

//слушатель событий для закрытия попапа добавления карточек по крестику
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
        popupPicture.src = link;
        titleModal.textContent = name;
        imageNameModal.alt = name;
        openPopup(imagePopup);
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
imagePopupCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
});

// функция, которая делает кнопку отправки неактивной
function disableSubmitBtn() {
    cardCreateBtn.classList.add('popup__button_disabled');
    cardCreateBtn.disabled = true;
}

//добавление новой карточки на страницу
function handleProfileFormSubmitAdd(event) {
    event.preventDefault();
    const card = {
        name: nameAddInput.value,
        link: imageAddInput.value
    };
    addCard(elementsContainer, card);
    closePopup(popupCards);

    // сброс данных формы добавления картинки
    nameAddInput.value = '';
    imageAddInput.value = '';
    disableSubmitBtn();
};

formCards.addEventListener('submit', handleProfileFormSubmitAdd);