import { getCardsApi, getUserApi, profileEditApi, addCardApi, profileEditAvatarApi } from './scripts/api.js';
import { createCard } from './scripts/card.js';
import { openModal, closeModal, closeModalOverlay, closeModalBtn } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import './pages/index.css';

const cardsContainer = document.querySelector('.places__list');
const profileEditForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['avatar'];

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardImgPopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarInputPopup = avatarPopup.querySelector('.popup__input_type_avatar');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileSubmitBtn = profileEditPopup.querySelector('.popup__button');
const addCardBtn = document.querySelector('.profile__add-button');
const addCardSubmitBtn = addCardPopup.querySelector('.popup__button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const imgPopup = cardImgPopup.querySelector('.popup__image');
const captionPopup = cardImgPopup.querySelector('.popup__caption');

let userId = null;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function renderCards(card) {
  cardsContainer.prepend(createCard(card, userId, openCardImgPopup));
}

popups.forEach(popup => {
  popup.addEventListener('click', closeModalOverlay);
  popup.querySelector('.popup__close').addEventListener('click', closeModalBtn);
});

function openCardImgPopup(link, name) {
  imgPopup.src = link;
  imgPopup.alt = name;
  captionPopup.textContent = name;
  openModal(cardImgPopup);
}

function openProfileEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileEditPopup);
}

profileEditBtn.addEventListener('click', openProfileEditPopup);

function submitProfileEditForm(e) {
  e.preventDefault();

  profileSubmitBtn.textContent = 'Сохранение...';

  profileEditApi({
    name: nameInput.value,
    about: jobInput.value
  })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closeModal(profileEditPopup);
    })
    .catch((error) => {
      console.log('Ошибка, данные пользователя не изменены:', error);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
}

profileEditForm.addEventListener('submit', submitProfileEditForm);

function submitCardAddForm(e) {
  e.preventDefault();

  addCardSubmitBtn.textContent = 'Сохранение...';
  addCardSubmitBtn.classList.add('.popup__button_disabled');

  addCardApi({
    name: cardName.value,
    link: cardLink.value
  })
    .then((card) => {
      renderCards(card);
      closeModal(addCardPopup);
      cardForm.reset();
    })
    .catch((error) => {
      console.log('Ошибка, карточка не добавлена:', error);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
}

addCardBtn.addEventListener('click', () => {
  clearValidation(cardForm, validationConfig);
  openModal(addCardPopup);
});
cardForm.addEventListener('submit', submitCardAddForm);

function submitAvatarForm(e) {
  e.preventDefault();

  profileEditAvatarApi({
    avatar: avatarInputPopup.value
  })
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarInputPopup.value})`;
      closeModal(avatarPopup);
    })
    .catch((error) => {
      console.log('Ошибка, аватар не обновлён:', error);
    });
}

avatarForm.addEventListener('submit', submitAvatarForm);
profileImage.addEventListener('click', () => {
  clearValidation(avatarPopup, validationConfig);
  avatarForm.reset();
  openModal(avatarPopup);
});




Promise.all([getUserApi(), getCardsApi()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((card) => {
      const newCard = createCard(card, userId, openCardImgPopup);
      cardsContainer.append(newCard);
    });
  })
  .catch((error) => {
    console.log('Ошибка, данные не загружены:', error);
  });

enableValidation(validationConfig);
