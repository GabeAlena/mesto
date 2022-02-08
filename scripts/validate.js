/*const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function formsValidationConfig(data) {
  const forms = [...document.querySelectorAll(data.formSelector)];
  forms.forEach(form => addFormListeners(form, data))
}

function addFormListeners(form, config) {
  form.addEventListener('submit', handleSubmit)
  form.addEventListener('input', () => setSubmitButtonState(form, config))
  const inputs = [...form.querySelectorAll(config.inputSelector)]
  inputs.forEach(input => input.addEventListener('input', () => handleField(form, input, config)))
  setSubmitButtonState(form, config)
}

function handleSubmit(event) {
  event.preventDefault();
}

function handleField(form, input, config) {
  if (input.validity.valid) {
      hideError(form, input, config)
  } else {
      showError(form, input, config)
  }
}

function showError(form, input, config) {
  input.classList.add(config.inputErrorClass)

  const errorElement = form.querySelector(`.${input.id}-error`)
  errorElement.classList.add(config.errorClass)

  errorElement.textContent = input.validationMessage;
}

function hideError(form, input, config) {
  input.classList.remove(config.inputErrorClass)
  const errorElement = form.querySelector(`.${input.id}-error`)
  errorElement.classList.remove(config.errorClass)

  errorElement.textContent = '';
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector)

  button.disabled = !form.checkValidity()
  button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
}

formsValidationConfig(enableValidation)*/




const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  //находим элемент в группе полей, связанный с полем span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Для поля ввода добавляем класс для оформления этого поля в случае неправильного ввода
  inputElement.classList.add(validationConfig.inputErrorClass);
  // Устанавливаем текстовое содержимое связанного спана с текстом ошибки из параметра errorMessage                       
  errorElement.textContent = errorMessage;
  // Для связанного спана добавляем класс в стилях которого определена его видимость
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  //находим элемент ошибки в группе полей, связанный с полем span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Для поля ввода удаляем класс для оформления этого поля в случае неправильного ввода
  inputElement.classList.remove(validationConfig.inputErrorClass);
  // Для связанного спана удаляем класс в стилях которого определена его видимость.
  errorElement.classList.remove(validationConfig.errorClass);
   // Обнуляем текстовое содержимое спана. Ошибки нет
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  // Анализируем прошло ли проверку валидации значение содержащееся в поле ввода inputElement
  if (!inputElement.validity.valid) {
    // если нет, то вызывается функция showInputError. В функцию передаем значение сообщения об ошибке
    //сгенерированного браузером (свойство validationMessage поля ввода inputElement)
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // если да, то вызывается функция hideInputError, которая скроет сообщения от ошибке
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  // Используем для перебора значений массива полей ввода функцию some().
  // Для каждого поля из массива проверяем корректно ли его содержимое.
  // Если хотя бы одно из полей неккоретно, то some вернет Истину. Иначе Ложь.
  return inputList.some(input => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonElement) => {
  // Вызываем функцию hasInvalidInput с передачей в нее массива полей ввода.
  // Анализируем возвращенное функцией значение
  if (hasInvalidInput(inputList)) {
  // Если функция hasInvalidInput вернула истину, значит есть некорректные поля,
  // то нужно добавлять класс который оформляет кнопку в состояние неактивной
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
  // Если функция hasInvalidInput вернула ложь, то есть все поля заполнены корректно,
  // то нужно удалить класс который оформляет кнопку в состояние неактивной.
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 

// функция добавления слушателя события всем элементам формы
const setEventListeners = (formElement) => {
  // Получаем коллекцию всех элементов группы полей с классом form__input.
  // Преобразуем его в массив
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  // Находим кнопку в группе полей
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  // Вызываем функцию toggleButtonState с передачей в нее массива найденных полей ввода и кнопки.
  // Нужно для установки недоступного состояния кнопки при загрузке страницы.
  toggleButtonState(inputList, buttonElement);
  // Обходим массив найденных полей ввода. Для каждого поля ввода (inputElement) выполняем код в фигурных скобках
  inputList.forEach((inputElement) => {
    // Подключаем обработчик события input для поля ввода.           
    inputElement.addEventListener('input', function () {  
       // Вызываем функцию checkInputValidity с передачей в нее группы полей 
       // и поля ввода на котором возникло событие input.          
      checkInputValidity(formElement, inputElement);  
      // Вызываем функцию toggleButtonState.     
      toggleButtonState(inputList, buttonElement);                  
    });
  });
};

// функция добавления обработчиков всем формам
const enableValidation = () => {
  // Получаем коллекцию всех элементов документа. Преобразуем его в массив 
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); 

  // Перебираем все найденные формы. Для каждой формы (formElement) выполняем блок кода в фигурных скобках.
  formList.forEach((formElement) => {       
    // Для каждой формы (formElement) подключаем обработчик отправки данных формы.
    formElement.addEventListener('submit', function (evt) {
      // При отправке данных формы отключить стандартные действия браузера.
      evt.preventDefault();                                         
    });

    // Вызываем функцию setEventListeners передав в нее текущую группу полей.                            
    setEventListeners(formElement);                                               
  });
};

// При загрузке страницы произойдет вызов функции enableValidation()
enableValidation(validationConfig); 