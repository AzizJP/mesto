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
import FormValidator from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

const popupOpenEditButton = document.querySelector('.profile__edit-button');
const cardElementOpenButton = document.querySelector('.profile__add-button');

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
  const createCard = new Card({item}, '#cards', viewPopupImage.open);
  return createCard.generateCard();
}

const cardContainer = new Section ({
  renderer: createCard,
}, cardsContainerSelector);

cardContainer.renderItems(initialCards.reverse());

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
