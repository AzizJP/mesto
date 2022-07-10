import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{

  constructor(popupSelector, formName, popupConfig, {inputSelector, submitButtonSelector, formSelector}, validationResetCallBack, submitCallBack, getterCallBack = null) {
    super (popupSelector, popupConfig);
    this._formName = formName;
    this._submitCallBack = submitCallBack;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._getterCallBack = getterCallBack;
    this._formSelector = formSelector;
    this._formElement = document.forms[this._formName];
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._validationResetCallBack = validationResetCallBack;
  }

  _getInputValues = () => {
    const values = {};
    this._inputList.forEach((inputElement) => {
      values[inputElement.id.slice(6)] = inputElement.value;
    })
    return values;
  }

  _setInputValues = (values) => {
    this._inputList.forEach((inputElement) => {
      inputElement.value = values[inputElement.id.slice(6)];
    })
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallBack(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._handleSubmit);
  }

  open() {
    if (this._getterCallBack) {
      this._setInputValues(this._getterCallBack());
    } else {
      this._formElement.reset();
    }
    this._validationResetCallBack();
    super.open();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
