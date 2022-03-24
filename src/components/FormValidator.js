export class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._settings = settings;

        const { inputSelector, submitButtonSelector } = this._settings;

        this._inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
        this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    };

      // функция, которая добавляет класс с ошибкой
    _showInputError = (inputElement, errorMessage) => {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

      // функция, которая удаляет класс с ошибкой
    _hideInputError = (inputElement) => {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };

    //функция, которая делает кнопку отправки неактивной
    disableSubmitBtn() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    // функция, которая проверяет валидность поля
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };
    
    // функция, которая находит невалидный инпут и возвращает тру
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // функция, которая отключает или включает кнопку сабмита на основе валидности
    // или невалидности инпута
    _toggleButtonState = () => {
        const { inactiveButtonClass } = this._settings;

        if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.remove(inactiveButtonClass);
          this._buttonElement.disabled = false;
        }
    }; 

    _setEventListeners() {             
        // блокируем кнопку сабмит при первом открытии попапа
        this._toggleButtonState();            

        this._inputList.forEach((inputElement) => {  
            inputElement.addEventListener('input', () => {  
                this._checkInputValidity(inputElement);
     
                this._toggleButtonState();                  
            });
        });
    };

     // метод который убирает ошибки при валидности полей
    checkValidity = () => {
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    };  

    enableValidation() {
          this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();       
          });

          this._setEventListeners();
    };
}