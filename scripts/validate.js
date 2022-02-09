const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  //находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Для поля ввода добавляем класс для оформления этого поля в случае неправильного ввода
  inputElement.classList.add(validationConfig.inputErrorClass);
  // заменим содержимое спана с ошибкой на переданный параметр                      
  errorElement.textContent = errorMessage;
  // Для связанного спана добавляем класс в стилях которого определена его видимость
  errorElement.classList.add(validationConfig.errorClass);
};

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  //находим элемент ошибки в группе полей, связанный с полем span
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  // Для поля ввода удаляем класс для оформления этого поля в случае неправильного ввода
  inputElement.classList.remove(validationConfig.inputErrorClass);
  // Для связанного спана удаляем класс в стилях которого определена его видимость.
  errorElement.classList.remove(validationConfig.errorClass);
   // Очистим ошибку
  errorElement.textContent = '';
};

// функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
  // Анализируем прошло ли проверку валидации значение содержащееся в поле ввода inputElement
  if (!inputElement.validity.valid) {
    // если нет, то вызывается функция showInputError. В функцию передаем значение сообщения об ошибке 
    //третьим аргументом, сгенерированного браузером
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // если да, то вызывается функция hideInputError, которая скроет сообщения от ошибке
    hideInputError(formElement, inputElement);
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
// и сигнаоизиует, можно ли разблокировать кнопку сабмита. Для стилизации
// нужна функция toggleButtonState - она отключает и включает кнопку на основе 
//true/false функции hasInvalidInput. Функция toggleButtonState принимает массив
// полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Вызываем функцию hasInvalidInput с передачей в нее массива полей ввода.
  if (hasInvalidInput(inputList)) {
  // Если функция hasInvalidInput вернула истину, значит есть некорректные поля,
  // то нужно добавить класс, который оформляет кнопку в состояние неактивной
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
  // Если функция hasInvalidInput вернула ложь, то есть все поля заполнены корректно,
  // то нужно удалить класс который оформляет кнопку в состояние неактивной.
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}; 

// Нужно сверять состояние кнопки при каждом изменении полей формы, поэтому
// функцию toggleButtonState вызывают внутри обработчика события input
// функция добавления слушателя события setEventListeners - всем элементам формы
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
    inputElement.addEventListener('input', () => {  
       // Вызываем функцию checkInputValidity с передачей в нее группы полей 
       // и поля ввода на котором возникло событие input.          
      checkInputValidity(formElement, inputElement);

      // Вызываем функцию toggleButtonState и передадим ей массив полей и кнопку   
      toggleButtonState(inputList, buttonElement);                  
    });
  });
};

// нужно найти все формы и вызвать для них функцию setEventListeners. Объявим функцию
// enableValidation, которая найдет и переберет все формы на странице
const enableValidation = (argumentEnableValidation) => {
  // Получаем коллекцию всех форм документа. Преобразуем его в массив 
  const formList = Array.from(document.querySelectorAll(argumentEnableValidation.formSelector)); 

  // Перебираем все найденные формы.
  formList.forEach((formElement) => {       
    // Для каждой формы (formElement) подключаем обработчик отправки данных формы.
    formElement.addEventListener('submit', (evt) => {
      // При отправке данных формы отключить стандартное поведение
      evt.preventDefault();                                         
    });

    // Вызываем функцию setEventListeners передав в нее элемент формы                           
    setEventListeners(formElement);                                               
  });
};

// При загрузке страницы произойдет вызов функции enableValidation()
enableValidation(validationConfig); 