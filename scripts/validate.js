const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

// функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Создадим функцию hasInvalidInput. Она принимает массив полей формы и
// возвращает true, если в нем хотя бы одно поле невалидно, и false,
// если все валидно. Для такой проверки используется метод some
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция hasInvalidInput только проверяет наличие  невалидного поля
// и сигнализирует, можно ли разблокировать кнопку сабмита. Для стилизации
// нужна функция toggleButtonState - она отключает и включает кнопку на основе 
//true/false функции hasInvalidInput. Функция toggleButtonState принимает массив
// полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 

// Нужно сверять состояние кнопки при каждом изменении полей формы, поэтому
// функцию toggleButtonState вызывают внутри обработчика события input
// функция добавления слушателя события setEventListeners - всем элементам формы
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
 
  toggleButtonState(inputList, buttonElement, settings);

  // Обходим массив найденных полей ввода. Для каждого поля ввода (inputElement) выполняем код в фигурных скобках
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {  
      checkInputValidity(formElement, inputElement, settings);

      toggleButtonState(inputList, buttonElement, settings);                  
    });
  });
};

// нужно найти все формы и вызвать для них функцию setEventListeners. Объявим функцию
// enableValidation, которая найдет и переберет все формы на странице
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); 

  // Перебираем все найденные формы.
  formList.forEach((formElement) => {       
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();                                         
    });

    // Вызываем функцию setEventListeners передав в нее элемент формы                           
    setEventListeners(formElement, settings);                                               
  });
};

// При загрузке страницы произойдет вызов функции enableValidation()
enableValidation(validationConfig); 