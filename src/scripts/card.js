const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, userId, openCardImgPopup, addLikeApi, deleteCardApi) {
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

  const likes = card.likes;
  cardLikesCounter.textContent = card.likes.length;

  if (likes.some((like) => { like._id === userId })) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }

  if (card.owner._id === userId) {
    cardDelBtn.addEventListener('click', () => deleteCardApi(cardId, cardDelBtn));
  } else {
    cardDelBtn.remove();
  }

  cardImage.addEventListener('click', () => openCardImgPopup(card.link, card.name));
  cardLikeBtn.addEventListener('click', () => addLikeApi(cardId, cardLikeBtn, cardLikesCounter));

  return card;
}

export function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
  card.remove();
}
