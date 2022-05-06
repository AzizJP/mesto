let popupOpenBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseBtn = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_info');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');

//popup open/close
function addPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
}
function removePopup () {
  popup.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', addPopup);
popupCloseBtn.addEventListener('click', removePopup);

//popup button__save
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  removePopup()
};
formElement.addEventListener('submit', formSubmitHandler);

