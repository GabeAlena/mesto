import Popup from './Popup.js';

export class PopupWithDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._popupSubmit = this._popup.querySelector('.popup__button_delete');
    }

    changeSubmit(data) {
        this._submitHandler = data;
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._popupSubmit.addEventListener('click', () => {
            this._submitHandler();
        });
    }
}