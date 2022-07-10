export class Card {

  #card = '.card';
  #cardTitle = '.card__title';
  #cardImage = '.card__image';
  #cardLike = '.card__like';
  #cardTrash = '.card__trash';
  #cardLikeActive = 'card__like_active';

  constructor({item}, templateSelector, handleCardImage) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleCardImage = handleCardImage;
  }

  _getCardTemplate(){
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(this.#card).cloneNode(true);
    return cardElement;
  }

  generateCard(){
    this.cardElement = this._getCardTemplate();
    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография места - ${this._name}`;
    return this.cardElement;
  }

  _setEventListeners(){
    this._cardTitle = this.cardElement.querySelector(this.#cardTitle);
    this._cardImage = this.cardElement.querySelector(this.#cardImage);
    this._cardLike = this.cardElement.querySelector(this.#cardLike);
    this._cardRemove = this.cardElement.querySelector(this.#cardTrash);
    this._cardLike.addEventListener('click', this._handleCardLike);
    this._cardRemove.addEventListener('click', this._handleCardRemove);
    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  _handleCardClick = () => {
    this._handleCardImage({name: this._name, link: this._link});
  };

  _handleCardLike = () => {
    this._cardLike.classList.toggle(this.#cardLikeActive);
  };

  _handleCardRemove = () => {
    this.cardElement.remove();
    this.cardElement = null;
  };
}
