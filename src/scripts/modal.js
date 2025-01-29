export function openModal(popup) {
  popup.classList.add('popup_is-animated')
  setTimeout(() => {
    popup.classList.add('popup_is-opened')
  }, 1)
  document.addEventListener('keydown', closeModalEsc);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalEsc);
}

function closeModalEsc(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

export function closeModalOverlay(e) {
  if (e.target.classList.contains('popup')) {
    closeModal(e.target)
  }
}

export function closeModalBtn(e) {
  const openedPopup = e.target.closest('.popup');
  closeModal(openedPopup);
}
