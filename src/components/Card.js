export class Card {

  #card = '.card';
  #cardTitle = '.card__title';
  #cardImage = '.card__image';
  #cardLike = '.card__like';
  #cardTrash = '.card__trash';
  #cardLikeActive = 'card__like_active';

  constructor({item}, cardTemplate, handleCardImage) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._handleCardImage = handleCardImage;
  }

  _getCardTemplate(){
    const cardElement = this._cardTemplate.content.querySelector(this.#card).cloneNode(true);
    return cardElement;
  }

  generateCard(){
    this.cardElement = this._getCardTemplate();
    this._setEventListeners();
    const cardTitle = this.cardElement.querySelector(this.#cardTitle);
    const cardImage = this.cardElement.querySelector(this.#cardImage);
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `Фотография места - ${this._name}`;
    return this.cardElement;
  }

  _setEventListeners(){
    const cardLike = this.cardElement.querySelector(this.#cardLike);
    const cardRemove = this.cardElement.querySelector(this.#cardTrash);
    const popupImage = this.cardElement.querySelector(this.#cardImage);
    cardLike.addEventListener('click', this._handleCardLike);
    cardRemove.addEventListener('click', this._handleCardRemove);
    popupImage.addEventListener('click', this._handleCardClick);
  };

  _handleCardClick = () => {
    this._handleCardImage({name: this._name, link: this._link});
  };

  _handleCardLike = (evt) => {
    evt.target.classList.toggle(this.#cardLikeActive);
  };

  _handleCardRemove = (evt) => {
    evt.target.closest(this.#card).remove();
  };
}
