let popupOpenBtn = document.querySelector('.profile__edit-button_popup');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close');
let popupSaveBtn = document.querySelector('.popup__save');

//popup open/close
function togglePopup () {
  popup.classList.toggle('popup_opened');
}
popupOpenBtn.addEventListener('click', function (event) {
  event.preventDefault();
  togglePopup();
});
popupCloseBtn.addEventListener('click', function (event) {
  togglePopup();
});

//popup button__save
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__form_name');
let jobInput = document.querySelector('.popup__form_info');

function formSubmitHandler (event) {
  event.preventDefault();
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__info').textContent = jobInput.value;
}
popupSaveBtn.addEventListener('click', function (event) {
  togglePopup();
});
formElement.addEventListener('submit', formSubmitHandler);

