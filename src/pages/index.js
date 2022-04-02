import './index.css';
import { api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards, imagePopup, trashButton,
         profileName, profileJob, nameInput, popupAvatar, popupDeleteCard,
         jobInput, popupCards,formCards, avatarChange, profileAvatarButton,
         elementsContainer, nameAddInput, imageAddInput,
         buttonProfileInfoEdit, buttonAddElement, popupProfile} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js'


const addElementValidator = new FormValidator(validationConfig, formCards);
addElementValidator.enableValidation();

const profileInfoEditValidator = new FormValidator(validationConfig, popupProfile);
profileInfoEditValidator.enableValidation();

const changeAvatarValidator = new FormValidator(validationConfig, popupAvatar);
changeAvatarValidator.enableValidation();

//--------------------------------------------------------------------------------
//Создаем экземпляр элемента имени пользователя и информации о себе
const userInfo = new UserInfo({
    selectorName: '.profile__name', 
    selectorJob: '.profile__job',
    selectorAvatar: '.profile__avatar'
});

//получаем данные профиля с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
    api.userId = result._id;
  })
  .catch((err) => {
      console.log(err);
  });

//получаем данные карточек с сервера
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
        const addCardElement = generateCard(data);
        section.addItem(addCardElement);
    })
  })
  .catch((err) => {
      console.log(err);
  });

//Будем создавать для каждого попапа новый экземпляр класса
const popupProfileAboutUser = new PopupWithForm(popupProfile, handleProfileSubmit);
popupProfileAboutUser.setEventListeners();

//Функция редактирования профиля, которая принимает новые данные пользователя
//и добавляет их на страницу
function handleProfileSubmit(data) {
    const { name, job } = data;

    api.editProfileData(name, job)
      .then(res => {
        userInfo.setUserInfo(name, job);
      })
      .catch((err) => {
          console.log(err);
      });

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
    profileInfoEditValidator.checkValidity();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//создаем экземпляр попапа на открытие картинки
const popupBigImage = new PopupWithImage(imagePopup);
popupBigImage.setEventListeners();

const renderCard = (data) => {
    const addCardElement = generateCard(data);
    section.addItem(addCardElement);
};

const generateCard = (data) => {
    const card = new Card(data, '#add-picture-template', () => {
        popupBigImage.open(data.link, data.name);
    });
    return card.createCard();
};

//создаем экземпляр section и отрисовываем карточки из массива
const section = new Section({
    items: [],
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
    addElementValidator.checkValidity();
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

//--------------------------------------------------------------------------------
//Будем создавать для каждого попапа новый экземпляр класса
const popupChangeAvatar = new PopupWithForm(popupAvatar);
popupChangeAvatar.setEventListeners();

//слушатель событий для открытия попапа добавления карточек
profileAvatarButton.addEventListener('click', () => {
    popupChangeAvatar.open();
    changeAvatarValidator.checkValidity();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
/*const popupForDeleteCard = new PopupWithForm(popupDeleteCard);
popupForDeleteCard.setEventListeners();

//слушатель который открывает попап с вопросом об удалении карточки при нажатии на мусорку
trashButton.addEventListener('click', () => {
    popupForDeleteCard.open();
});*/