import { popupActiveClass } from './constants.js';

export const openPopup = (element) => {
    document.body.style.overflow = 'hidden';
    element.classList.add(popupActiveClass);
    document.addEventListener('keydown', closePopupEsc);
    element.addEventListener('click', handleOverlayClick);
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
    }
}

function closePopupEsc(event) {
    if (event.code === 'Escape') {
        const openedPopup = document.querySelector('.popup_active')
        closePopup(openedPopup);
    }
}

export const closePopup = (element) => {
    document.body.style.overflow = '';
    element.classList.remove(popupActiveClass);
    document.removeEventListener('keydown', closePopupEsc);
    element.removeEventListener('click', handleOverlayClick);
}