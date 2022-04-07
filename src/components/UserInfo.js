export class UserInfo {
    constructor({ selectorName, selectorJob, selectorAvatar }) {
      this._profileName = document.querySelector(selectorName);
      this._profileJob = document.querySelector(selectorJob);
      this._profileAvatar = document.querySelector(selectorAvatar);
    };

    // Содержит публичный метод, который возвращает объект с данными пользователя. Этот метод пригодится когда данные
    // пользователя нужно будет подставить в форму при открытии
    getUserInfo = () => {
        return {
            selName: this._profileName.textContent,
            selJob: this._profileJob.textContent,
            selAvatar: this._profileAvatar.src
        }
    };

    // Содержит публичный метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo = ({ name, about, avatar }) => {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileAvatar.src = avatar;
    };
}