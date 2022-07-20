export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const formValidators = {};

export const formConfiguration = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  formSelector: '.popup__form',
}

export const popupConfiguration = {
  activeModifier: 'popup_opened',
  closeButtonSelector: 'popup__close',
}

export const profileConfiguration = {
  titleSelector: '.profile__name',
  jobSelector: '.profile__info',
  avatarSelector: '.profile__avatar',
}

export const viewPopupConfiguration = {
  imageSelector: '.popup__image',
  captionSelector: '.popup__name',
}

export const buttonCaptions = {
  normalCaption:'Сохранить',
  activeCaption: 'Сохранение...',
}

export const confirmDeleteButtonCaptions = {
  normalCaption:'Да',
  activeCaption: 'Удаляю...',
}

export const cardsContainerSelector = '.cards';
export const newCardPopupSelector = '.popup-add-card';
export const profilePopupSelector = '.popup-edit-profile';
export const avatarPopupSelector = '.popup-profile-avatar';
export const confirmationPopupSelector = '.popup-confirm';
export const imagePopupSelector = '.popup-image';
export const newCardFormName = 'add-place';
export const profileFormName = 'form__profile';
export const avatarFormName = 'profile-avatar';
export const trashPopupFormName = 'card-trash-popup';
