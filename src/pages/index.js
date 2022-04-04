import './index.css';
import { api } from '../components/Api.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig, initialCards, imagePopup, trashButton,
         profileName, profileJob, nameInput, popupAvatar, popupDeleteCard,
         jobInput, popupCards,formCards, profileAvatar, profileAvatarButton,
         elementsContainer, nameAddInput, imageAddInput, avatarInput,
         buttonProfileInfoEdit, buttonAddElement, popupProfile} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
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

//обьявим константу нашего айди
let userId

//1. получаем данные профиля с сервера
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

//Будем создавать для каждого попапа новый экземпляр класса
const popupProfileAboutUser = new PopupWithForm(popupProfile, handleProfileSubmit);
popupProfileAboutUser.setEventListeners();

//Функция редактирования профиля, которая принимает новые данные пользователя
//и добавляет их на страницу
function handleProfileSubmit(data) {
    const { name, job } = data;

    api.editProfileData(name, job)
      .then(() => {
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
//Функция редактирования аватара, которая принимает новый аватар и возвращает его на страницу
const popupChangeAvatar = new PopupWithForm(popupAvatar, handleAvatarSubmit);
function handleAvatarSubmit(data) {
    const { avatar } = data;

    api.patchAvatar(avatar)
      .then((res) => {
          console.log(res);
          userInfo.setAvatar(avatar);
      })
      .catch((err) => console.log(err));  

      popupChangeAvatar.close();
};

popupChangeAvatar.setEventListeners();

//слушатель событий для изменения аватара
profileAvatarButton.addEventListener('click', () => {
    popupChangeAvatar.open();
    changeAvatarValidator.checkValidity();
});
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
//создаем экземпляр попапа на открытие картинки
const popupBigImage = new PopupWithImage(imagePopup);
popupBigImage.setEventListeners();

//2. получаем данные карточек с сервера
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
        const card = generateCard({
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

const generateCard = (data) => {
    const card = new Card(
      data,
      '#add-picture-template', 
      () => {
        popupBigImage.open(data.link, data.name);
      },
      (id) => {
        console.log('clicked button')  ;
        console.log(id);  
        popupForDeleteCard.open();
        popupForDeleteCard.changeSubmitHandler(() => {
            api.deleteCard(id)
              .then(res => {
                  console.log(res);
                  card.deleteCard();
                  popupForDeleteCard.close();
              })
              .catch((err) => {
                console.log(err);
              })
        })
      },
      (id) => {
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
    );
    return card.createCard();
};

//создаем экземпляр section и отрисовываем карточки из массива
const section = new Section({
    items: [],
    renderer: renderCard
}, elementsContainer);

const renderCard = (data) => {
    const addCardElement = generateCard(data);
    section.addItem(addCardElement);
};

section.renderItems();

//создаем экземпляр формы добавления карточки
const popupAddCard = new PopupWithForm(popupCards, (data) => {
    api.postNewCard(nameAddInput.value, imageAddInput.value)
    .then((res) => {
      console.log(res);  
      const card = generateCard({
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

  // сброс данных формы добавления картинки
  addElementValidator.disableSubmitBtn();
});

popupAddCard.setEventListeners();

//слушатель событий для открытия попапа добавления карточек
buttonAddElement.addEventListener('click', () => {
    addElementValidator.checkValidity();
    popupAddCard.open();
});

/*function handleProfileFormSubmitAdd(data) {
    api.postNewCard(nameAddInput.value, imageAddInput.value)
      .then((res) => {
        console.log(res);  
        const card = generateCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        })
        section.addItem(card);
        popupAddCard.close();
      })
      .catch((err) => {
          console.log(err);
      })
    
    // сброс данных формы добавления картинки
    addElementValidator.disableSubmitBtn();
};*/

/*//функция добавления новой карточки на страницу
function handleProfileFormSubmitAdd() {
    const card = generateCard({
        name: nameAddInput.value,
        link: imageAddInput.value
    });

    section.addItem(card);
    popupAddCard.close();

    // сброс данных формы добавления картинки
    addElementValidator.disableSubmitBtn();
};*/
//--------------------------------------------------------------------------------

//--------------------------------------------------------------------------------
/*//добавление новой карточки на страницу - ПОКА НЕ РАБОТАЕТ
const handleProfileFormSubmitAdd = () => {
    api.postNewCard(nameAddInput.value, imageAddInput.value)
      .then((res) => {
        const card = generateCard({
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
    
    // сброс данных формы добавления картинки
    addElementValidator.disableSubmitBtn();
};*/


//--------------------------------------------------------------------------------

/*const addElementValidator = new FormValidator(validationConfig, formCards);
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

//обьявим константу нашего айди
let userId

//1. получаем данные профиля с сервера
api.getUserInfo()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);

    userId = res._id;
  })
  .catch((err) => {
      console.log(err);
  });

//2. получаем данные карточек с сервера
api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
        const addCardElement = generateCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        });
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
      .then(() => {
        userInfo.setUserInfo(name, job);
      })
      .catch((err) => {
          console.log(err);
      });

    popupProfileAboutUser.close();
};

//добавление новой карточки
const handleProfileFormSubmitAdd = () => {
    api.postNewCard(nameAddInput.value, imageAddInput.value)
      .then((res) => {
        const card = generateCard({
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
    
    // сброс данных формы добавления картинки
    addElementValidator.disableSubmitBtn();
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
    const card = new Card(
      data,
      '#add-picture-template', 
      () => {
        popupBigImage.open(data.link, data.name);
      },
      (id) => {
        console.log('clicked button')  ;
        console.log(id);  
        popupForDeleteCard.open();
        popupForDeleteCard.changeSubmitHandler(() => {
            api.deleteCard(id)
              .then(res => {
                  console.log(res);
                  card.deleteCard();
                  popupForDeleteCard.close();
              })
              .catch((err) => {
                console.log(err);
              })
        })
      },
      () => {
          console.log('clicked button');
          popupForDeleteCard.open();
      },
      (id) => {
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
    );
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

// НУЖНО НАПИСАТЬ ЛОГИКУ СМЕНЫ АВАТАРА, СЕЙЧАС ПРОСТО ОТКРЫВАЕТСЯ ПОПАП
//Будем создавать для каждого попапа новый экземпляр класса
const popupChangeAvatar = new PopupWithForm(popupAvatar);
popupChangeAvatar.setEventListeners();

//слушатель событий для изменения аватара
profileAvatarButton.addEventListener('click', () => {
    popupChangeAvatar.open();
    changeAvatarValidator.checkValidity();
});

const popupForDeleteCard = new PopupWithForm(popupDeleteCard, () => {
    console.log('delete');
});
popupForDeleteCard.setEventListeners();*/