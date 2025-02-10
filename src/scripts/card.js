const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, openCardImgPopup, likeCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardDelBtn = cardElement.querySelector('.card__delete-button');

  const cardId = card._id;
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener('click', () => openCardImgPopup(card.link, card.name));
  // cardLikeBtn.addEventListener('click', () => );
  cardDelBtn.addEventListener('click', () => deleteCard(cardItem));

  return card;
}

export function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
  card.remove();
}
