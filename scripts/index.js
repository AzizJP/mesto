//---Задаем переменные---
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupEditButton = document.querySelector('#edit-btn');
const popupCloseEditButton = document.querySelector('#popup__close');
const formEditButton = document.querySelector('#form__profile');
const nameInputEditButton = document.querySelector('.popup__input_type_name');
const jobInputEditButton = document.querySelector('.popup__input_type_info');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const cardTemplate = document.querySelector('#cards').content;
const card = document.querySelector('.cards');
const cardElementAddButton = document.querySelector('#add-btn');
const cardElementCloseButton = document.querySelector('#add-btn__close');
const cardElementOpenButton = document.querySelector('.profile__add-button');
const cardElementForm = document.querySelector('#add-place')
const titleInputAddButton = document.querySelector('.popup__input_type_place');
const linkInputAddButton = document.querySelector('.popup__input_type_link');
const popupCardImage = document.querySelector('#popup__img');
const popupCardImageCloseButton = document.querySelector('#img-btn__close');


//---Функция переключения класса модального окна---
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function closePopupOverlay(popup) {
  popup.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') closePopup(popup);
  });
}


//---Редактор профиля---
popupOpenEditButton.addEventListener('click', () =>{
  openPopup(popupEditButton);
  nameInputEditButton.value = profileName.textContent;
  jobInputEditButton.value = profileInfo.textContent;
  closePopupOverlay(popupEditButton);
  popupOpenValidation(popupEditButton, config);
});
popupCloseEditButton.addEventListener('click', () => {
  closePopup(popupEditButton);
});


//---Добавление карточки---
cardElementOpenButton.addEventListener('click', () => {
  openPopup(cardElementAddButton);
  closePopupOverlay(cardElementAddButton);
  popupOpenValidation(cardElementAddButton, config);
  cardElementForm.reset();
});
cardElementCloseButton.addEventListener('click', () => {
  closePopup(cardElementAddButton);
});



//---Разворачивание изображения---
popupCardImageCloseButton.addEventListener('click', () => {
  closePopup(popupCardImage);
});


//---Сохранение изменений---

//Редактор профиля
function formSubmitHandlerEditButton (evt) {
  evt.preventDefault();
  profileName.textContent = nameInputEditButton.value;
  profileInfo.textContent = jobInputEditButton.value;
  closePopup(popupEditButton);
};
formEditButton.addEventListener('submit', formSubmitHandlerEditButton);



//---Функция активации лайка---

function cardLikeHandler (evt) {
  evt.target.classList.toggle('card__like_active');
};



//---Функция удаления карточек---

function cardRemoveHandler (evt){
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
  cardLike.addEventListener('click', cardLikeHandler);
  cardRemove.addEventListener('click', cardRemoveHandler);
  popupImage.addEventListener('click', () => {
    const popupImg = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__name');
    popupTitle.textContent = cardTitle.textContent;
    popupImg.src = cardImg.src;
    popupImg.alt = cardTitle.textContent;
    openPopup(popupCardImage);
    closePopupOverlay(popupCardImage);
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
  card.prepend(createCards({name: titleInputAddButton.value, link: linkInputAddButton.value}));
}
//Создаем слушателя
cardElementForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(card);
  closePopup(cardElementAddButton);
  cardElementForm.reset();
});
