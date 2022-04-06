import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, submitCallbackForm) {
      super(popup);

      this._submitCallbackForm = submitCallbackForm;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
      this._submitButton = this._form.querySelector('.popup__button');
    };

    //метод для отображения сохранения введенных данных в попап
    renderLoading(loading, text) {
        if(loading === true) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = text;
        };
    };

    //Содержит приватный метод, который собирает данные всех полей формы
    getInputValues = () => {
      this._inputList.forEach((input) => {
          this._formValues[input.name] = input.value;
      });
      return this._formValues;
    };

    /*setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }*/

    //Перезаписывает родительский метод setEvenetListeners. Данный метод должен не только добавлять обработчик клика иконке закрытия, 
    // но и добавлять обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this.getInputValues();
            this._submitCallbackForm(data);
        });
    };

    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна еще сбрасываться
    close = () => {
        super.close();
        this._form.reset();
    };
}