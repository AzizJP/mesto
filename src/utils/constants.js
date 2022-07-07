export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const formValidators = {};

export const formConfiguration = {
  inputSelector: 'popup__input',
  submitButtonSelector: 'popup__save',
  formSelector: 'popup__form',
}

export const popupConfiguration = {
  activeModifier: 'popup_opened',
  closeButtonSelector: 'popup__close',
}

export const profileConfiguration = {
  titleSelector: 'profile__name',
  jobSelector: 'profile__info',
}

export const viewPopupConfiguration = {
  imageSelector: 'popup__image',
  captionSelector: 'popup__name',
}

export const cardsContainerSelector = 'cards';
export const newCardPopupSelector = 'popup-add-card';
export const profilePopupSelector = 'popup-edit-profile';
export const imagePopupSelector = 'popup-image';
export const newCardFormName = 'add-place';
export const profileFormName = 'form__profile';
