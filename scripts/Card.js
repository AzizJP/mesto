import {openPopup} from './index.js'

export class Card {
  #cards = '#cards';
  #card = '.card';
  #cardTitle = '.card__title';
  #cardImage = '.card__image';
  #cardLike = '.card__like';
  #cardTrash = '.card__trash';
  #cardLikeActive = 'card__like_active';
  #popupCardImage = '#popup__img';
  #popupImage = '.popup__image';
  #popupName = '.popup__name';

  constructor(itemName, itemLink) {
    this._name = itemName;
    this._link = itemLink;
  }

  createCards(){
    const cardElement = document.querySelector(this.#cards).content.querySelector(this.#card).cloneNode(true);
    const cardTitle = cardElement.querySelector(this.#cardTitle);
    const cardImage = cardElement.querySelector(this.#cardImage);
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `Фотография места - ${this._name}`;
    const cardLike = cardElement.querySelector(this.#cardLike);
    const cardRemove = cardElement.querySelector(this.#cardTrash);
    const popupImage = cardElement.querySelector(this.#cardImage);
    cardLike.addEventListener('click', this._handleCardLike);
    cardRemove.addEventListener('click', this._handleCardRemove);
    popupImage.addEventListener('click', () => {
      const popupImg = document.querySelector(this.#popupImage);
      const popupTitle = document.querySelector(this.#popupName);
      popupTitle.textContent = cardTitle.textContent;
      popupImg.src = cardImage.src;
      popupImg.alt = cardTitle.textContent;
      const popupCardImage = document.querySelector(this.#popupCardImage);
      openPopup(popupCardImage);
    });
    return cardElement;
  }

  _handleCardLike = (evt) => {
    evt.target.classList.toggle(this.#cardLikeActive);
  };

  _handleCardRemove = (evt) => {
    evt.target.closest(this.#card).remove();
  };
}
