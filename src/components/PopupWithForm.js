import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallbackForm) {
      super(popupSelector);

      this._submitCallbackForm = submitCallbackForm;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
    };

    //Содержит приватный метод, который собирает данные всех полей формы
    _getInputValues = () => {
      this._inputList.forEach((input) => {
          this._formValues[input.name] = input.value;
      });
      return this._formValues;
    };

    /*//для удаления своей карточки по мусорке
    changeSubmitHandler(newSubmitCallbackForm) {
        this._submitCallbackForm = newSubmitCallbackForm;
    }*/

    //Перезаписывает родительский метод setEvenetListeners. Данный метод должен не только добавлять обработчик клика иконке закрытия, 
    // но и добавлять обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallbackForm(this._getInputValues());
        });
    };

    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна еще сбрасываться
    close = () => {
        super.close();
        this._form.reset();
    };
}

/*//Класс, который наследует от Popup. Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallbackForm) {
      super(popupSelector);

      this._submitCallbackForm = submitCallbackForm;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._form.querySelectorAll('.popup__input');
      this._formValues = {};
    };

    //Содержит приватный метод, который собирает данные всех полей формы
    _getInputValues = () => {
      this._inputList.forEach((input) => {
          this._formValues[input.name] = input.value;
      })
      return this._formValues;
    };

    //для удаления своей карточки по мусорке
    changeSubmitHandler(newSubmitCallbackForm) {
        this._submitCallbackForm = newSubmitCallbackForm;
    }

    //Перезаписывает родительский метод setEvenetListeners. Данный метод должен не только добавлять обработчик клика иконке закрытия, 
    // но и добавлять обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallbackForm(this._getInputValues());
        });
    };

    //Перезаписывает родительский метод close, так как при закрытии попапа форма должна еще сбрасываться
    close() {
        super.close();
        this._form.reset();
    };
}*/