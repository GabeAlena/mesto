import Popup from './Popup.js';

export class PopupWithDelete extends Popup {
    constructor(popup) {
        super(popup);

        this._popupSubmit = this._popup.querySelector('.popup__button_delete');
    }

    changeSubmit(newHandler) {
        this._submitHandler = newHandler;
    }
    
    setEventListeners() {
        super.setEventListeners();

        this._popupSubmit.addEventListener('click', () => {
            this._submitHandler();
        });
    }
}