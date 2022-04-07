export class UserInfo {
    constructor({ selectorName, selectorJob, selectorAvatar, _id }) {
      this._profileName = document.querySelector(selectorName);
      this._profileJob = document.querySelector(selectorJob);
      this._profileAvatar = document.querySelector(selectorAvatar);
      this._userId = _id;
    };

    // Содержит публичный метод, который возвращает объект с данными пользователя. Этот метод пригодится когда данные
    // пользователя нужно будет подставить в форму при открытии
    getUserInfo = () => {
        return {
            selName: this._profileName.textContent,
            selJob: this._profileJob.textContent,
            selAvatar: this._profileAvatar.src,
            _id: this._userId
        }
    };

    // Содержит публичный метод, который принимает новые данные пользователя и добавляет их на страницу
    setUserInfo = ({ name, about, avatar, _id }) => {
        this._profileName.textContent = name;
        this._profileJob.textContent = about;
        this._profileAvatar.src = avatar;
        this._userId = _id;
    };
}