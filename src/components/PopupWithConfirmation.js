import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfig, formName, confirmationButtonSelector, submitHandler, {normalCaption, activeCaption}) {
    super (popupSelector, popupConfig);
    this._formName = formName;
    this._submitCallBack = submitHandler;
    this._confirmationButtonSelector = confirmationButtonSelector;
    this._normalCaption = normalCaption;
    this._activeCaption = activeCaption;
    this._formElement = document.forms[this._formName];
    this._submitButton = this._formElement.querySelector(this._confirmationButtonSelector);
  }

  toggleButtonCaption = (isSaving) => {
    this._submitButton.textContent = isSaving ? this._activeCaption : this._normalCaption;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallBack(this._cardId, this._removeCardCallback, this.toggleButtonCaption, this.close);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  open(cardId, removeCardCallback) {
    this._cardId = cardId;
    this._removeCardCallback = removeCardCallback;
    super.open();
  }

  close = () => {
    super.close();
  }
}
