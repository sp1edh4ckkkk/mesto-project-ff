const cardTemplate = document.querySelector('#card-template').content;

export function createCard({name, link}, openCardImgPopup, likeCard, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like-button');
  const cardDelBtn = card.querySelector('.card__delete-button');
  const cardItem = card.querySelector('.card');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener('click', () => openCardImgPopup({name, link}));
  cardLikeBtn.addEventListener('click', likeCard);
  cardDelBtn.addEventListener('click', () => deleteCard(cardItem));

  return card;
}

export function likeCard(e) {
  e.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
  card.remove();
}
