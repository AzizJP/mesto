export class Popup {
  constructor(popupSelector, popupConfig){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._activeModifier = popupConfig.activeModifier;
    this._closeButtonSelector = popupConfig.closeButtonSelector;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._activeModifier)) {
        this.close();
      };
      if (evt.target.classList.contains(this._closeButtonSelector)) {
        this.close();
      };
    });
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._activeModifier);
  }

  close() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._activeModifier);
  }
}
