export class Card {

  #card = '.card';
  #cardTitle = '.card__title';
  #cardImage = '.card__image';
  #cardLike = '.card__like';
  #cardTrash = '.card__trash';
  #cardLikeActive = 'card__like_active';
  #cardLikeNumber = '.card__like_number';

  constructor({ name, link, likes, _id, owner:{ _id: ownerId} }, userId, templateSelector, { cardImageHandler, cardTrashHandler, cardLikeHandler }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = _id;
    this._isOwner = userId === ownerId;
    this._templateSelector = templateSelector;
    this._handleCardImage = cardImageHandler;
    this._handleCardDelete = cardTrashHandler;
    this._userId = userId;
    this._handleCardLike = cardLikeHandler;
  }

  _getCardTemplate(){
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(this.#card).cloneNode(true);
    return cardElement;
  }

  generateCard(){
    this.cardElement = this._getCardTemplate();
    this._cardsCounter = this.cardElement.querySelector(this.#cardLikeNumber);
    this._setEventListeners();
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `Фотография места - ${this._name}`;
    this._renderLikes();
    return this.cardElement;
  }

  _isLiked() {
    return this._likes.map((item) => item._id).includes(this._userId);
  }

  _renderLikes() {
    if (this._isLiked()) {
      this._cardLike.classList.add(this.#cardLikeActive);
    }  else {
      this._cardLike.classList.remove(this.#cardLikeActive);
    }
    this._cardsCounter.textContent = this._likes.length;
  }

  setLikes = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
  }

  _handleCardDeleteClick = () => {
    this._handleCardDelete(this._id, this.handleCardRemove)
  }

  _setEventListeners(){
    this._cardTitle = this.cardElement.querySelector(this.#cardTitle);
    this._cardImage = this.cardElement.querySelector(this.#cardImage);
    this._cardLike = this.cardElement.querySelector(this.#cardLike);
    this._cardRemove = this.cardElement.querySelector(this.#cardTrash);
    this._cardLike.addEventListener('click', this._handleLikeClick);
    if (this._isOwner) {
      this._cardRemove.addEventListener('click', this._handleCardDeleteClick);
    } else {
      this._cardRemove.remove();
    }
    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  _handleCardClick = () => {
    this._handleCardImage({name: this._name, link: this._link});
  };

  _handleLikeClick = () => {
    this._handleCardLike(this._id, this._isLiked(), this.setLikes)
  };

  handleCardRemove = () => {
    this.cardElement.remove();
    this.cardElement = null;
  };
}
