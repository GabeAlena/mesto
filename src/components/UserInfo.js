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