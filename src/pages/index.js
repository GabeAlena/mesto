import './index.css';
import { api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, imagePopup, nameInput, popupAvatar, popupDeleteCard,
         jobInput, popupCards,formCards, profileAvatarButton, elementsContainer, 
         nameAddInput, imageAddInput, buttonProfileInfoEdit, buttonAddElement, 
         popupProfile} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';

const addElementValidator = new FormValidator(validationConfig, formCards);
const profileInfoEditValidator = new FormValidator(validationConfig, popupProfile);
const changeAvatarValidator = new FormValidator(validationConfig, popupAvatar);
const popupProfileAboutUser = new PopupWithForm(popupProfile, handleProfileSubmit);
const popupChangeAvatar = new PopupWithForm(popupAvatar, handleAvatarSubmit);
const popupBigImage = new PopupWithImage(imagePopup);
const popupForDeleteCard = new PopupWithDelete(popupDeleteCard);
let userId
const userInfo = new UserInfo({
    selectorName: '.profile__name', 
    selectorJob: '.profile__job',
    selectorAvatar: '.profile__avatar'
});

//--------------------------------------------------------------------------------
//1. Загрузка информации о пользователе с сервера
api.getUserInfo()
  .then(res => {
    console.log(res);  
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);

    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  });
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//3. Редактирование профиля
function handleProfileSubmit(data) {
    popupProfileAboutUser.renderLoading(true);
    const { name, job } = data;

    api.editProfileData(name, job)
      .then(() => {
        userInfo.setUserInfo(name, job);
        popupProfileAboutUser.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('сохранение');
        popupProfileAboutUser.renderLoading(false, 'Сохранить');
      })

};

buttonProfileInfoEdit.addEventListener('click', () => {
    const data = userInfo.getUserInfo();

    nameInput.value = data.selName;
    jobInput.value = data.selJob;

    popupProfileAboutUser.open();
    profileInfoEditValidator.checkValidity();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//9. Обновление аватара пользователя
function handleAvatarSubmit(data) {
    popupChangeAvatar.renderLoading(true);
    const { avatar } = data;

    api.patchAvatar(avatar)
      .then((res) => {
        console.log(res);
        userInfo.setAvatar(avatar);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })   
      .then(() => {
        console.log('сохранение');
        popupChangeAvatar.renderLoading(false, 'Сохранить');
      });

};

//слушатель событий для изменения аватара
profileAvatarButton.addEventListener('click', () => {
    popupChangeAvatar.open();
    changeAvatarValidator.checkValidity();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//2. Загрузка карточек с сервера
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
        const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        });
        section.addItem(card);
    })
  })
  .catch((err) => {
      console.log(err);
  });

const createCard = (data) => {
    const card = new Card(
      data,
      '#add-picture-template', 
      () => {
        popupBigImage.open(data.link, data.name);
      },
      (id) => { //8. Постановка и снятие лайков
        console.log('clicked like');  
        console.log(id);  
        if(card.isLiked()) {
            api.deleteLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
            api.putLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      },
      (id) => { //7. Удаление карточки
        console.log('clicked button trash');
        console.log(id);  
        popupForDeleteCard.open();
        popupForDeleteCard.changeSubmit(() => {
            api.deleteCard(id)
              .then(res => {
                console.log('yes');
                console.log(res);
                card.deleteCard();
                popupForDeleteCard.close();
              })
              .catch((err) => {
                console.log(err);
              })
        })
      }
    );
    return card.createCard();
};

//создаем экземпляр section и отрисовываем карточки из массива
const section = new Section({
    items: [],
    renderer: renderCard
}, elementsContainer);

const renderCard = (data) => {
    const addCardElement = createCard(data);
    section.addItem(addCardElement);
};

section.renderItems();
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//4. Добавление новой карточки
const popupAddCard = new PopupWithForm(popupCards, (data) => {
    popupAddCard.renderLoading(true);
    api.postNewCard(nameAddInput.value, imageAddInput.value)
    .then((res) => {
      console.log(res);  
      const card = createCard({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
      })
      section.addItem(card);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .then(() => {
      console.log('сохранение');
      popupAddCard.renderLoading(false, 'Создать');
    });

  // сброс данных формы добавления картинки
  addElementValidator.disableSubmitBtn();
});

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', () => {
    addElementValidator.checkValidity();
    popupAddCard.open();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
addElementValidator.enableValidation();
profileInfoEditValidator.enableValidation();
changeAvatarValidator.enableValidation();
popupProfileAboutUser.setEventListeners();
popupChangeAvatar.setEventListeners();
popupBigImage.setEventListeners();
popupAddCard.setEventListeners();
popupForDeleteCard.setEventListeners();
//--------------------------------------------------------------------------------