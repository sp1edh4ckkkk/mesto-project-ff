import { initialCards } from './scripts/cards.js';
import { createCard, likeCard, deleteCard } from './scripts/card.js';
import { openModal, closeModal, closeModalOverlay, closeModalBtn } from './scripts/modal.js';
import './pages/index.css';

const cardsContainer = document.querySelector('.places__list');
const profileEditForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const cardImgPopup = document.querySelector('.popup_type_image');

const profileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_url');
const imgPopup = cardImgPopup.querySelector('.popup__image');
const captionPopup = cardImgPopup.querySelector('.popup__caption');

initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card, openCardImgPopup, likeCard, deleteCard));
});

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
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileEditPopup);
}

profileEditForm.addEventListener('submit', submitProfileEditForm);

function openAddCardPopup() {
  openModal(addCardPopup);
}

addCardBtn.addEventListener('click', openAddCardPopup);

function addCard(e) {
  e.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value
  }
  const newCard = createCard(card, openCardImgPopup, likeCard, deleteCard);

  cardsContainer.prepend(newCard);
  closeModal(addCardPopup);
  cardForm.reset();
}

cardForm.addEventListener('submit', addCard);

function openCardImgPopup(card) {
  imgPopup.src = card.link;
  imgPopup.alt = card.name;
  captionPopup.textContent = card.name;
  openModal(cardImgPopup);
}
