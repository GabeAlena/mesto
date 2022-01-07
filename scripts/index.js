const buttonProfileInfoEdit = document.querySelector('.profile__edit-button');
const buttonClose = document.querySelector('.popup__close-btn');
const overlay = document.querySelector('.overlay');
const overlayActiveClass = 'overlay_active';
let form = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

buttonProfileInfoEdit.addEventListener('click', function(event) {
    overlay.classList.add(overlayActiveClass);
    document.body.style.overflow = 'hidden';
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

buttonClose.addEventListener('click', function() {
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
});

function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    overlay.classList.remove(overlayActiveClass);
    document.body.style.overflow = '';
};

form.addEventListener('submit', formSubmitHandler);