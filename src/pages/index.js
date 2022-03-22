import './index.css';

import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards, imagePopup,
         profileName, profileJob, nameInput,
         jobInput, popupCards,formCards, 
         elementsContainer, nameAddInput, imageAddInput,
         buttonProfileInfoEdit, buttonAddElement, popupProfile} from '../components/constants.js';
import { Card } from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js'


const addElementValidator = new FormValidator(validationConfig, formCards);
addElementValidator.enableValidation();

const profileInfoEditValidator = new FormValidator(validationConfig, popupProfile);
profileInfoEditValidator.enableValidation();

//--------------------------------------------------------------------------------
//Создаем экземпляр элемента имени пользователя и информации о себе
const userInfo = new UserInfo({
    selectorName: '.profile__name', 
    selectorJob: '.profile__job'
});

//Будем создавать для каждого попапа новый экземпляр класса
const popupProfileAboutUser = new PopupWithForm(popupProfile, handleProfileSubmit);
popupProfileAboutUser.setEventListeners();

//Функция редактирования профиля, которая принимает новые данные пользователя
//и добавляет их на страницу
function handleProfileSubmit({name, job}) {
    profileName.textContent = name;
    profileJob.textContent = job;

    userInfo.setUserInfo(name, job);
    popupProfileAboutUser.close();
};

//слушатель событий для кнопки изменения данных профиля, при котором в форму добавляются
//данные профиля пользователя при открытии попапа (т. е. данные со страницы попадают
//в открытый попап)
buttonProfileInfoEdit.addEventListener('click', () => {
    const data = userInfo.getUserInfo();

    nameInput.value = data.selName;
    jobInput.value = data.selJob;

    popupProfileAboutUser.open();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//создаем экземпляр попапа на открытие картинки
const popupBigImage = new PopupWithImage(imagePopup);
popupBigImage.setEventListeners();

//создаем экземпляр section и отрисовываем карточки из массива
const section = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card(data, '#add-picture-template', () => {
            popupBigImage.open(data.link, data.name);
        });
        const cardElement = card.createCard();
        section.addItem(cardElement);
    }
}, elementsContainer);

section.renderItems();
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//создаем экземпляр формы добавления карточки
const popupAddCard = new PopupWithForm(popupCards, handleProfileFormSubmitAdd);
popupAddCard.setEventListeners();

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', () => {
    popupAddCard.open();
});

//добавление новой карточки на страницу
function handleProfileFormSubmitAdd() {
    const card = {
        name: nameAddInput.value,
        link: imageAddInput.value
    };

    elementsContainer.prepend(addCard(card));
    popupAddCard.close();

    // сброс данных формы добавления картинки
    formCards.reset();
    addElementValidator.disableSubmitBtn();
};

//функция добавления карточки в контейнер
function addCard(data) {
    const card = new Card(data, '#add-picture-template');
    const cardElement = card.createCard();

    return cardElement;
};
//--------------------------------------------------------------------------------


/*import { FormValidator } from './FormValidator.js';
import { validationConfig, initialCards, imagePopup,
         profileName, profileJob, popupProfile,
         buttonCloseProfile, formProfile, nameInput,
         jobInput, imagePopupCloseBtn, popupCards,
         buttonCloseAdd, formCards, elementsContainer,
         nameAddInput, imageAddInput, cardCreateBtn,
         buttonProfileInfoEdit, buttonAddElement} from './constants.js';
import { Card } from './Card.js';
import { openPopup, closePopup } from './utils.js';

const profileInfoEditValidator = new FormValidator(validationConfig, popupProfile);
const addElementValidator = new FormValidator(validationConfig, formCards);

profileInfoEditValidator.enableValidation();
addElementValidator.enableValidation();

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

imagePopupCloseBtn.addEventListener('click', () => {
    closePopup(imagePopup);
});

//создание функции для ввода новых данных профиля
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};

const cardSelector = '#add-picture-template';

//функция добавления карточки в контейнер
function addCard(data) {
    const card = new Card(data, cardSelector);
    const cardElement = card.createCard();

    return cardElement;
};

initialCards.forEach(function(data) {
    elementsContainer.append(addCard(data));
});

//добавление новой карточки на страницу
function handleProfileFormSubmitAdd(event) {
    event.preventDefault();
    const card = {
        name: nameAddInput.value,
        link: imageAddInput.value
    };

    elementsContainer.prepend(addCard(card));
    closePopup(popupCards);

    // сброс данных формы добавления картинки
    formCards.reset();
    addElementValidator.disableSubmitBtn();
};

formCards.addEventListener('submit', handleProfileFormSubmitAdd);*/