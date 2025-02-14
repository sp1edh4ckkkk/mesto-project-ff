import { deleteCardApi, addLikeApi, deleteLikeApi } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export const createCard = function (card, userId, openCardImgPopup) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardDelBtn = cardElement.querySelector('.card__delete-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');

  const cardId = card._id;

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (Array.isArray(card.likes) && card.likes.length > 0) {
    cardLikesCounter.textContent = card.likes.length;
    cardLikeBtn.classList.toggle('card__like-button_is-active', card.likes.some((like) => like._id === userId));
  } else {
    cardLikesCounter.textContent = 0;
  }

  if (card.owner._id === userId) {
    cardDelBtn.addEventListener('click', () => deleteCard(cardId, cardElement));
  } else {
    cardDelBtn.remove();
  }

  cardImage.addEventListener('click', () => openCardImgPopup(card.link, card.name));
  cardLikeBtn.addEventListener('click', () => likeCard(cardId, cardLikeBtn, cardLikesCounter));

  return cardElement;
}

export function likeCard(cardId, cardElement, cardLikesCounter) {
  // e.target.classList.toggle('card__like-button_is-active');
  if (!cardElement.classList.contains("card__like-button_is-active")) {
    addLikeApi(cardId)
      .then((response) => {
        cardElement.classList.add('card__like-button_is-active');
        cardLikesCounter.textContent = response.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка, не удалось поставить лайк:', error);
      });
  } else {
    deleteLikeApi(cardId)
      .then((response) => {
        cardElement.classList.remove('card__like-button_is-active');
        cardLikesCounter.textContent = response.likes.length;
      })
      .catch((error) => {
        console.log('Ошибка, не удалось удалить лайк:', error);
      });
  }
}

export function deleteCard(cardId, cardElement) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log('Ошибка, карточка не удалена:', error);
    });
}
