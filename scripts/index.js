//---Задаем переменные---
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupEditButton = document.querySelector('#edit-btn');
const popupCloseEditButton = document.querySelector('#popup__close');
const profileForm = document.querySelector('#form__profile');
const inputTypeName = document.querySelector('.popup__input_type_name');
const inputTypeInfo = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const cardTemplate = document.querySelector('#cards').content;
const card = document.querySelector('.cards');
const cardElementAddButton = document.querySelector('#add-btn');
const cardElementCloseButton = document.querySelector('#add-btn__close');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const cardElementForm = document.querySelector('#add-place')
const inputTypePlace = document.querySelector('.popup__input_type_place');
const inputTypeLink = document.querySelector('.popup__input_type_link');
const popupCardImage = document.querySelector('#popup__img');
const popupCardImageCloseButton = document.querySelector('#img-btn__close');
const popupImg = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__name');
const popups = document.querySelectorAll('.popup')


// ---Закрытие попапов сликом на крестик или оверлей---
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      };
  });
});


// ---Функция закрытия попапа нажатием на клавишу Escape---
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


//---Функция переключения класса модального окна---
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}


//---Редактор профиля---
popupOpenEditButton.addEventListener('click', () =>{
  openPopup(popupEditButton);
  inputTypeName.value = profileName.textContent;
  inputTypeInfo.value = profileInfo.textContent;
  resetValidation(popupEditButton, config);
});


//---Добавление карточки---
cardElementOpenButton.addEventListener('click', () => {
  openPopup(cardElementAddButton);
  resetValidation(cardElementAddButton, config);
  cardElementForm.reset();
});


//---Сохранение изменений---

//Редактор профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputTypeName.value;
  profileInfo.textContent = inputTypeInfo.value;
  closePopup(popupEditButton);
};
profileForm.addEventListener('submit', handleProfileFormSubmit);


//---Функция активации лайка---

function handleCardLike (evt) {
  evt.target.classList.toggle('card__like_active');
};


//---Функция удаления карточек---

function handleCardRemove (evt){
  evt.target.closest('.card').remove();
};


//---Отображение существующего массива данных---

//Создаем карточки
function createCards (item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');
  cardTitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = `Фотография места - ${item.name}`;
  const cardLike = cardElement.querySelector('.card__like');
  const cardRemove = cardElement.querySelector('.card__trash');
  const popupImage = cardElement.querySelector('.card__image');
  cardLike.addEventListener('click', handleCardLike);
  cardRemove.addEventListener('click', handleCardRemove);
  popupImage.addEventListener('click', () => {
    popupTitle.textContent = cardTitle.textContent;
    popupImg.src = cardImg.src;
    popupImg.alt = cardTitle.textContent;
    openPopup(popupCardImage);
    });
  return cardElement;
}
//Добавляем карточки в разметку
function renderCards (card, item) {
  card.append(createCards(item));
}
//Перебор массива
initialCards.forEach((item) => {
  renderCards(card, item)
});


//Добавляем карточку в разметку
function renderCard (card) {
  card.prepend(createCards({name: inputTypePlace.value, link: inputTypeLink.value}));
}
//Создаем слушателя
cardElementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(card);
  closePopup(cardElementAddButton);
  cardElementForm.reset();
});
