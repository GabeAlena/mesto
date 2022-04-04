// Класс отвечает за отрисовку элементов на странице
//Первым параметром конструктор принимает объект с двумя свойствами. Первый это массив данных, которые нужно добавить
//на страницу при инициализации классаю Вторым - это функция, которая отвечает за создание и отрисовку данных на странице
// Второй параметр конструктора - селектор контейнера, в который нужно добавлять созданные элементы
export class Section {
    constructor( { items, renderer }, containerSelector) {
        this._initialCards = items;
        this._renderer = renderer;
        this._elementsContainer = containerSelector;
    };

// Некоторый публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна
// осуществляться функцией renderer
    renderItems = () => {
        this._initialCards.forEach(item => {
            this._renderer(item/*, this._elementsContainer*/);
        });
    };

// Публичный метод, который принимает дом-элемент и добавляет его в контейнер
    addItem = (element) => {
        this._elementsContainer.append(element);
    };
}