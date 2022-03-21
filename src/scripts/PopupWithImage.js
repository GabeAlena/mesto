import { SourceMapGenerator } from "source-map-js/lib/source-map-generator";
import Popup from './Popup.js';

//Класс, который наследует от Popup. Этот класс должен перезаписывать родительский метод open.
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.element__image');
        this._title = this._popup.querySelector('.element__title');
    };

    //В методе нужно вставлять в попап картинку с src изображения и подписью к картинке
    open = (link, name) => {
        super.open();

        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
    };
}