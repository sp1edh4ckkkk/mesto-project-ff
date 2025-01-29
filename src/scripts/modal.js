export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

export function closeModalEsc(popup) {

}

export function closeModalOverlay(popup) {

}

export function closeModalBtn(popup) {

}
