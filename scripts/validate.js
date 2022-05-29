const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


//---Валидация форм---

// Функция, которая показывает сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
// Функция, которая скрывает сообщение об ошибке
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputSelector);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};


// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, config);
  }
};


// Функция, которая принимает параметром элемент формы и добавляет его полю нужный обработчик
const setEventListener = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(formElement, inputList, config);
    });
  });
};


// Функция, которая находит и обрабатывает все формы на странице
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, config);
  });
};


// Проверка валидности поля методом some
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true, обход массива прекратится и вся функция hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};


// Функция, которая деактивирует кнопку "Сохранить" при невалидных инпутах
const toggleButtonState = (formElement, inputList, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};


// Функция, которая проверяет валидность полей при открытии попапа
const resetValidation = (popup, config) => {
  const formElement = popup.querySelector(config.formSelector)
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
    toggleButtonState(formElement, inputList, config);
  });
}


enableValidation(config);
