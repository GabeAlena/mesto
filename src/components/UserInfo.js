// Класс отвечает за управление отображением информации о пользователе на странице.
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и информации о себе
export default class UserInfo {
    constructor({ selectorName, selectorJob }) {
      this._profileName = document.querySelector(selectorName);
      this._profileJob = document.querySelector(selectorJob);
    };

    // Содержит публичный метод, который возвращает объект с данными пользователя. Этот метод пригодится когда данные
    // пользователя нужно будет подставить в форму при открытии
    getUserInfo = () => {
        return {
            selName: this._profileName.textContent,
            selJob: this._profileJob.textContent
        }
    };

    // Содержит публичный метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo = (profileName, profileJob) => {
        this._profileName.textContent = profileName;
        this._profileJob.textContent = profileJob;
    };
}

/*


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

//создание функции для ввода новых данных профиля
function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfile);
};
*/