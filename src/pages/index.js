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

const generateCard = (data) => {
    const card = new Card(data, '#add-picture-template', () => {
        popupBigImage.open(data.link, data.name);
    });
    return card.createCard();
};

const renderCard = (data) => {
    const addCardElement = generateCard(data);
    section.addItem(addCardElement);
};

//создаем экземпляр section и отрисовываем карточки из массива
const section = new Section({
    items: initialCards,
    renderer: renderCard
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
    const card = generateCard({
        name: nameAddInput.value,
        link: imageAddInput.value
    });

    section.addItem(card);
    popupAddCard.close();

    // сброс данных формы добавления картинки
    addElementValidator.disableSubmitBtn();
};
//--------------------------------------------------------------------------------