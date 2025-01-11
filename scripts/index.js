// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard ({name, link}) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImage = card.querySelector(".card__image");
  const cardDelBtn = card.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardDelBtn.addEventListener("click", deleteCard);

  return card;
}

// @todo: Функция удаления карточки
function deleteCard (e) {
  const card = e.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
  cardsList.append(createCard(card))
});
