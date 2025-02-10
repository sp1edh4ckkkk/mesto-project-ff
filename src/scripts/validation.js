export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showError = (form, input, validationConfig) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  error.classList.add(validationConfig.errorClass);
  error.textContent = input.validationMessage;
}

const hideError = (form, input, validationConfig) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  error.classList.remove(validationConfig.errorClass);
  error.textContent = '';
}

const inputIsValid = (form, input, validationConfig) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (input.validity.valid) {
    hideError(
      form,
      input,
      validationConfig
    );
  } else {
    showError(
      form,
      input,
      validationConfig
    );
  }
}

const changeBtn = (inputList, submitBtn, validationConfig) => {
  if (inputList.some((input) => input.validity.valid )) {
    submitBtn.classList.remove(validationConfig.inactiveButtonClass);
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.add(validationConfig.inactiveButtonClass);
    submitBtn.disabled = true;
  }
}

const setEventListeners = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitBtn = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      inputIsValid(form, input, validationConfig);
      changeBtn(inputList, submitBtn, validationConfig);
    });
  });
}

export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

export const clearValidation = (form, validationConfig) => {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitBtn = form.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach((input) => {
    input.value = '';
    hideInputError(form, input, validationConfig);
  });

  submitBtn.classList.add(validationConfig.inactiveButtonClass);
  submitBtn.disabled = true;
}
