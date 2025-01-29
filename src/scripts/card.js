const cardTemplate = document.querySelector("#card-template").content;

export function createCard({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelBtn = card.querySelector(".card__delete-button");
  const cardItem = card.querySelector(".card");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardDelBtn.addEventListener("click", () => deleteCard(cardItem));

  return card;
}

function deleteCard(card) {
  card.remove();
}
