const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function openPopup() {
    overlay.classList.add(overlayActiveClass);
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
}

buttonProfileInfoEdit.addEventListener('click', function(event) {
    openPopup();
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

buttonClose.addEventListener('click', function() {
    closePopup();
});

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};

form.addEventListener('submit', formSubmitHandler);

const buttonAddElement = document.querySelector('.profile__add-button');
const buttonCloseAdd = document.querySelector('.popupAdd__close-btn');
const overlayAdd = document.querySelector('.overlayAdd');
const overlayAddActiveClass = 'overlayAdd_active';
let formAdd = document.querySelector('.popupAdd__container');
const elementsContainer = document.querySelector('.elements-container');
const deleteButton = document.querySelector('.element__trash');
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
  
function openPopupAdd() {
    overlayAdd.classList.add(overlayAddActiveClass);
    document.body.style.overflow = 'hidden';
}

function closePopupAdd() {
    overlayAdd.classList.remove(overlayAddActiveClass);
    document.body.style.overflow = '';
}

buttonAddElement.addEventListener('click', function(event) {
    openPopupAdd();
});

buttonCloseAdd.addEventListener('click', function() {
    closePopupAdd();
});

//Создание модального окна
const overlayModal = document.querySelector('.overlayModal');
const buttonModalImage = document.querySelector('.element__image');
const overlayModalActiveClass = 'overlayModal_active';
const modalClose = document.querySelector('.modalWindow__close-btn');

const imageModal = document.querySelector('.modalWindow__image');
const titleModal = document.querySelector('.modalWindow__title');
const imageElement = document.querySelector('.element__image');
const titleElement = document.querySelector('.element__title');

function openPopupModal() {
    overlayModal.classList.add(overlayModalActiveClass);
    document.body.style.overflow = 'hidden';
}

function closePopupModal() {
    overlayModal.classList.remove(overlayModalActiveClass);
    document.body.style.overflow = '';
}

function addPicture(nameValue, imageValue) {
    //получаем содержимое темплейта обращаясь к его свойству content
    const addPictureTemplate = document.querySelector('#add-picture-template').content;
    //клонируем содержимое тега темплейт
    const addPictureElement = addPictureTemplate.querySelector('.element').cloneNode(true);
    //наполняем содержимым
    const addTitleElement = addPictureElement.querySelector('.element__title');
    const addImageElement = addPictureElement.querySelector('.element__image');
    addTitleElement.textContent = nameValue;
    addImageElement.src = imageValue;
    
    //нажатие лайка
    const elementLike = addPictureElement.querySelector('.element__like');
    elementLike.addEventListener('click', function(event) {
        event.target.classList.toggle('element__like_active');
    });

    //удаление карточки
    const elementTrash = addPictureElement.querySelector('.element__trash');
    elementTrash.addEventListener('click', function(event) {
        event.target.closest('.element').remove();
    });
    
    //вызов модального окна
    addImageElement.addEventListener('click', function(event) {
        openPopupModal();
        imageModal.src = imageValue;
        titleModal.textContent = nameValue;
    });

    //закрытие модального окна
    modalClose.addEventListener('click', function() {
        closePopupModal();
    });

    //отображаем на странице карточки
    elementsContainer.prepend(addPictureElement);
}

initialCards.forEach(item => {
    addPicture(item.name, item.link);
});

//добавление новой карточки на страницу
function formAddSubmitHandler (event) {
    event.preventDefault();
    let nameAddInput = document.querySelector('.popupAdd__input_type_name');
    let imageAddInput = document.querySelector('.popupAdd__input_type_image');
    addPicture(nameAddInput.value, imageAddInput.value);
    closePopupAdd();
}

formAdd.addEventListener('submit', formAddSubmitHandler);