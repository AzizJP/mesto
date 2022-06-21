import { initialCards, config } from './constants.js';
import FormValidator from './FormValidator.js';
import { Card } from './Card.js';

//---Задаем переменные---
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupEditButton = document.querySelector('#edit-btn');
const profileForm = document.querySelector('#form__profile');
const inputTypeName = document.querySelector('.popup__input_type_name');
const inputTypeInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const card = document.querySelector('.cards');
const cardElementAddButton = document.querySelector('#add-btn');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const cardElementForm = document.querySelector('#add-place')
const inputTypePlace = document.querySelector('.popup__input_type_place');
const inputTypeLink = document.querySelector('.popup__input_type_link');
const popups = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('#cards');


// ---Закрытие попапов кликом на крестик или оверлей---
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      };
  });
});

// ---Функция закрытия попапа нажатием на клавишу Escape---
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//---Функция переключения класса модального окна---
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

Array.from(document.forms).forEach((formElement) => {
  const form = new FormValidator(config, formElement);
  form.enableValidation();

  //---Редактор профиля---
  popupOpenEditButton.addEventListener('click', () =>{
  openPopup(popupEditButton);
  inputTypeName.value = profileName.textContent;
  inputTypeInfo.value = profileInfo.textContent;
  form.resetValidation();
  });

  //---Добавление карточки---
  cardElementOpenButton.addEventListener('click', () => {
  openPopup(cardElementAddButton);
  form.resetValidation();
  cardElementForm.reset();
  });
});

//---Сохранение изменений---

//Редактор профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputTypeName.value;
  profileInfo.textContent = inputTypeInfo.value;
  closePopup(popupEditButton);
};
profileForm.addEventListener('submit', handleProfileFormSubmit);

function createCard (name, link) {
  const createCard = new Card(name, link, cardTemplate);
  return createCard.generateCard();
}

//Добавляем карточки в разметку
function renderCards (card, item) {
  card.append(createCard (item.name, item.link));
}
//Перебор массива
initialCards.forEach((item) => {
  renderCards(card, item)
});

//Добавляем карточку в разметку
function renderCard (card) {
  card.prepend(createCard(inputTypePlace.value, inputTypeLink.value, cardTemplate));
}

//Создаем слушателя
cardElementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(card);
  closePopup(cardElementAddButton);
  cardElementForm.reset();
});

