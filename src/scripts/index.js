import {
  initialCards,
  config,
  cardsContainerSelector,
  newCardPopupSelector,
  popupConfiguration,
  profilePopupSelector,
  imagePopupSelector,
  formConfiguration,
  newCardFormName,
  profileFormName,
  profileConfiguration,
  viewPopupConfiguration,
  formValidators,
} from '../utils/constants.js';
import '../pages/index.css';
import FormValidator from './FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../utils/PopupWithForm.js';
import { UserInfo } from '../utils/UserInfo.js';
import { PopupWithImage } from '../utils/PopupWithImage.js';

const popupOpenEditButton = document.querySelector('.profile__edit-button');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('#cards');

Array.from(document.forms).forEach((formElement) => {
  formValidators[formElement.name] = new FormValidator(config, formElement);
  formValidators[formElement.name].enableValidation();
});

const viewPopupImage = new PopupWithImage(
  imagePopupSelector,
  popupConfiguration,
  viewPopupConfiguration,
);
viewPopupImage.setEventListeners();

function createCard (item) {
  const createCard = new Card({item}, cardTemplate, viewPopupImage.open);
  return createCard.generateCard();
}

const cardContainer = new Section ({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsContainerSelector);

cardContainer.rendererAll();

const handleCardSubmit = (item) => {
  cardContainer.addItem(item);
}

const newCardPopup = new PopupWithForm(
  newCardPopupSelector,
  newCardFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newCardFormName].resetValidation,
  handleCardSubmit,
  );
newCardPopup.setEventListeners();

const user = new UserInfo(profileConfiguration);
user.setUserInfo({title: "Жак-Ив Кусто", info: "Исследователь океана"})

const addCardSubmitHandler = () => {
  newCardPopup.open();
}

const handleProfileFormSubmit = (data) => {
  user.setUserInfo(data);
}

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].resetValidation,
  handleProfileFormSubmit,
  user.getUserInfo,
  );
profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
  profilePopup.open();
}

cardElementOpenButton.addEventListener('click', addCardSubmitHandler);
popupOpenEditButton.addEventListener('click', handleProfilePopupOpen);
