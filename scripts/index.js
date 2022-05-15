//---Задаем переменные---

let popupOpenBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('#edit-btn');
let popupCloseBtn = document.querySelector('#popup__close');
let formElement = document.querySelector('#form__profile');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_info');
let profileName = document.querySelector('.profile__name');
let profileInfo = document.querySelector('.profile__info');
const cardTemplate = document.querySelector('#cards').content;
const cards = document.querySelector('.cards');
let addPlaceBtn = document.querySelector('#add-btn');
let addPlaceCloseBtn = document.querySelector('#add-btn__close');
let addPlaceOpenBtn = document.querySelector('.profile__add-button');
const addPlaceForm = document.querySelector('#add-place')
let titleInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_link');
let addImgPopup = document.querySelector('#popup__img');
let imgCloseBtn = document.querySelector('#img-btn__close');



//---Полученный массив---

const initialCards = [
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



//---Функции открытия/закрытия попапов---

//Редактор профиля
function addPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
};
function removePopup () {
  popup.classList.remove('popup_opened');
};
popupOpenBtn.addEventListener('click', addPopup);
popupCloseBtn.addEventListener('click', removePopup);

//Добавление карточки
function addPopupPlace () {
  addPlaceBtn.classList.add('popup_opened');
};
function removePopupPlace () {
  addPlaceBtn.classList.remove('popup_opened');
};
addPlaceOpenBtn.addEventListener('click', addPopupPlace);
addPlaceCloseBtn.addEventListener('click', removePopupPlace);

//Разворачивание изображения
function removePopupImg () {
  addImgPopup.classList.remove('popup_opened');
};
imgCloseBtn.addEventListener('click', removePopupImg);



//---Сохранение изменений---

//Редактор профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  removePopup();
};
formElement.addEventListener('submit', formSubmitHandler);

//Добавление карточки
addPlaceForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');
  cardTitle.textContent = titleInput.value;
  cardImg.src = linkInput.value;
  cardImg.alt = `Фотография места - ${titleInput.value}`;
  cards.prepend(cardElement);
  removePopupPlace();
  addPlaceForm.reset();
});



//---Отображение существующего массива данных---

initialCards.forEach((item) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImg = cardElement.querySelector('.card__image');
  cardTitle.textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = `Фотография места - ${item.name}`;
  cards.append(cardElement);
});



//---Функция активации лайка---

function cardLike (el) {
  el.classList.toggle('card__like_active');
};



//---Функция удаления карточек---

function removeCard(el){
  const cardElement = el.closest('.card');
  cardElement.remove();
};



//---Функция разворачивания изображения

function openPopupCard (el) {
  const cardElement = el.closest('.card');
  const cardImg = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const popupImg = document.querySelector('.popup__image');
  const popupTitle = document.querySelector('.popup__name');
  popupTitle.textContent = cardTitle.textContent;
  popupImg.src = cardImg.src;
  popupImg.alt = cardTitle.textContent;
  addImgPopup.classList.add('popup_opened');
};



//---Вызов функций при помощи обработчика onckick---

cards.onclick = (evt) => {
  const el = evt.target;
  if (el.classList.contains('card__like')) {
    cardLike (el);
  } else if (el.classList.contains('card__image')) {
    openPopupCard(el);
  } else if (el.classList.contains('card__trash')) {
    removeCard(el);
  } else {
    return;
  }
};




