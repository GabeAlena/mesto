//Описание кнопки редактирования профиля
const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
//Описание кнопки(крестика) закрытия попапа
const buttonClose = document.querySelector('.popup__close-btn');
//Описание класса оверлэй (затемнение экрана при открытии попапа)
const overlay = document.querySelector('.overlay');
//Описание кнопки Сохранить изменения
const buttonSubmit = document.querySelector('.form__button');
//Описание оверлэя для открытия попапа
const overlayActiveClass = 'overlay_active';

//Слушаем событие нажатия на кнопку редактирования профиля
//Передаем объект события event, который отменит переход по ссылке
//и откроет попап
//а также добавим строку чтобы не было вертикального скролла при открытом попапе
buttonProfileInfoEdit.addEventListener('click', function(event) {
    event.preventDefault();
    overlay.classList.add(overlayActiveClass);
    document.body.style.overflow = 'hidden';
});

//Слушаем событие нажатия на кнопку крестик
//При нажатии на крестик попап закрывается
//а также добавим строку чтобы вертикальный скролл был
buttonClose.addEventListener('click', function() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
});

//Сделаем возможность редактирования профиля в попапе
//Находим окошко попапа
let formElement = document.querySelector('.popup');
//Находим поля попапа
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
//Присваиваем переменные профилю
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

//Обработчик отправки формы, хотя она пока
//никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); //эта строка отменяет стандартную отправку формы

//Тут нужно получить значения полей jobInput и nameInput из свойства value 
//Выбрать элементы, куда должны быть вставлены значения полей
//Вставить новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
};

//Сделаем так, чтобы по клику по кнопке сохранить окошко попапа закрывалось
//и появлялся вертикальный скролл
buttonSubmit.addEventListener('click', function() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
});

//Прикрепляем обработчик к форме
//он будет следить за событием сабмит
formElement.addEventListener('submit', formSubmitHandler);
