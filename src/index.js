import { initialCards } from './scripts/cards.js';
import { createCard } from './scripts/card.js';
import { openModal, closeModal, closeModalEsc, closeModalOverlay, closeModalBtn } from './scripts/modal.js'
import './pages/index.css';

const cardsContainer = document.querySelector(".places__list");

const popups = document.querySelectorAll('.popup');

const profileEditBtn = document.querySelector('.profile__edit-button');

initialCards.forEach(function (card) {
  cardsContainer.append(createCard(card));
});

popups.forEach(popup => {
  popup.addEventListener('click', closeModalOverlay);
  popup.querySelector('.popup__close').addEventListener('click', closeModalBtn);
});

function openProfileEditPopup() {
  
}
