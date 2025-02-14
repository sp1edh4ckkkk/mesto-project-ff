import { 
  getCardsApi,
  getUserApi,
  profileEditApi,
  profileEditAvatarApi,
  addCardApi,
  addLikeApi,
  deleteCardApi
} from './scripts/api.js';
import { initialCards } from './scripts/cards.js';
import { createCard, likeCard, deleteCard } from './scripts/card.js';
import { openModal, closeModal, closeModalOverlay, closeModalBtn } from './scripts/modal.js';
import { validationConfig, enableValidation, clearValidation } from './scripts/validation.js';
import './pages/index.css';

const cardsContainer = document.querySelector('.places__list');
const profileEditForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const avatarEditPopup = document.querySelector('.popup__image');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardImgPopup = document.querySelector('.popup_type_image');

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileSubmitBtn = profileEditPopup.querySelector('.popup__button');
const addCardBtn = document.querySelector('.profile__add-button');
const addCardSubmitBtn = addCardPopup.querySelector('.popup__button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const imgPopup = cardImgPopup.querySelector('.popup__image');
const captionPopup = cardImgPopup.querySelector('.popup__caption');

let userId = null;
let cardId = null;

function renderCards() {
  initialCards.forEach((card) => {
    cardsContainer.append(createCard(card, userId, openCardImgPopup, addLikeApi, deleteCardApi));
  });
}

popups.forEach(popup => {
  popup.addEventListener('click', closeModalOverlay);
  popup.querySelector('.popup__close').addEventListener('click', closeModalBtn);
});

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

  const name = cardName.value;
  const link = cardLink.value;
  addCardSubmitBtn.classList.add('.popup__button_disabled');

  addCardApi({ name, link })
    .then((card) => {
      renderCards(card);
      closeModal(addCardPopup);
      addCardPopup.reset();
    })
    .catch((error) => {
      console.log('Ошибка, карточка не добавлена:', error);
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
}

addCardBtn.addEventListener('click', () => {
  // clearValidation();
  openModal(addCardPopup);
});
cardForm.addEventListener('submit', submitCardAddForm);

function openCardImgPopup(card) {
  imgPopup.src = card.link;
  imgPopup.alt = card.name;
  captionPopup.textContent = card.name;
  openModal(cardImgPopup);
}

enableValidation(validationConfig);

Promise.all([getUserApi(), getCardsApi()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarEditPopup.style.backgroundImage = `url(${userData.avatar})`;

    initialCards.forEach((card) => {
      cardsContainer.prepend(createCard(card, userId, openCardImgPopup, addLikeApi, deleteCardApi));
    });
  })
  .catch((error) => {
    console.log('Ошибка, данные не загружены:', error);
  });
