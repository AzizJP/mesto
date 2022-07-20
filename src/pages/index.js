import {
  config,
  cardsContainerSelector,
  newCardPopupSelector,
  popupConfiguration,
  profilePopupSelector,
  avatarPopupSelector,
  imagePopupSelector,
  confirmationPopupSelector,
  buttonCaptions,
  confirmDeleteButtonCaptions,
  formConfiguration,
  newCardFormName,
  profileFormName,
  avatarFormName,
  trashPopupFormName,
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
import { Api } from '../components/Api.js';
import { data } from 'autoprefixer';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const popupOpenEditButton = document.querySelector('.profile__edit-button');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');

const api = new Api('https://nomoreparties.co/v1/cohort-45');

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
  const createCard = new Card(
    item,
    user.getUserId(),
    '#cards',
    {
      cardImageHandler: viewPopupImage.open,
      cardTrashHandler: handleDeleteConfirm,
      cardLikeHandler: handleCardLike
    });
  return createCard.generateCard();
}

const cardContainer = new Section ({
  renderer: createCard,
}, cardsContainerSelector);

function addCardToServer(data, toggleButtonCaptionCallback, closePopupCallback) {
  toggleButtonCaptionCallback(true);
  api.addNewCard(data.name, data.link)
  .then((res) => {
    cardContainer.addItem(res);
    closePopupCallback();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleButtonCaptionCallback(false);
  })
}

const newCardPopup = new PopupWithForm(
  newCardPopupSelector,
  newCardFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[newCardFormName].resetValidation,
  addCardToServer,
  buttonCaptions,
  );
newCardPopup.setEventListeners();

const user = new UserInfo(profileConfiguration);

const addCardSubmitHandler = () => {
  newCardPopup.open();
}

function patchProfileInfoToServer(data, toggleButtonCaptionCallback, closePopupCallback) {
  toggleButtonCaptionCallback(true);
  api.patchProfileInfo(data.title, data.info)
  .then((res) => {
    user.setUserInfo(res);
    closePopupCallback();
  })
  .catch((err) => {
    console.dir(err);
  })
  .finally(() => {
    toggleButtonCaptionCallback(false);
  })
}

const profilePopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[profileFormName].resetValidation,
  patchProfileInfoToServer,
  buttonCaptions,
  user.getUserInfo,
  );
profilePopup.setEventListeners();

const handleProfilePopupOpen = () => {
  profilePopup.open();
}

function patchAvatarToServer(data, toggleButtonCaptionCallback, closePopupCallback) {
  toggleButtonCaptionCallback(true);
  api.patchAvatar(data.avatar)
  .then((res) => {
    user.setUserInfo(res);
    closePopupCallback();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleButtonCaptionCallback(false);
  })
}

const avatarPopup = new PopupWithForm(
  avatarPopupSelector,
  avatarFormName,
  popupConfiguration,
  formConfiguration,
  formValidators[avatarFormName].resetValidation,
  patchAvatarToServer,
  buttonCaptions,
);
avatarPopup.setEventListeners();

const handleAvatarPopupOpen = () => {
  avatarPopup.open();
}

function handleCardLike (cardId, isLiked, setLikesCallback) {
  api.toogleLike(cardId, isLiked)
  .then(({ likes }) => setLikesCallback(likes))
  .catch((err) => {
    console.log(err);
  })
}

function handleCardDelete (cardId, removeCardCallback, toggleButtonCaptionCallback, closePopupCallback) {
  toggleButtonCaptionCallback(true);
  api.deleteCard(cardId)
  .then(() => {
    removeCardCallback();
    closePopupCallback();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleButtonCaptionCallback(false);
  })
}

const confirmationPopup = new PopupWithConfirmation(
  confirmationPopupSelector,
  popupConfiguration,
  trashPopupFormName,
  formConfiguration.submitButtonSelector,
  handleCardDelete,
  confirmDeleteButtonCaptions,
);
confirmationPopup.setEventListeners();

function handleDeleteConfirm(cardId, removeCardCallback) {
  confirmationPopup.open(cardId, removeCardCallback)
}

cardElementOpenButton.addEventListener('click', addCardSubmitHandler);
popupOpenEditButton.addEventListener('click', handleProfilePopupOpen);
profileAvatar.addEventListener('click', handleAvatarPopupOpen);

Promise.all([api.getProfileInfo(), api.getInitialCards()])
.then(([profile, cards]) => {
  user.setUserInfo(profile)
  cardContainer.renderItems(cards.reverse());

})
.catch((err) => {
  console.log(err);
})
