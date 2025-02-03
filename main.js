(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=t.name,p=t.link,u=e.cloneNode(!0),d=u.querySelector(".card__title"),i=u.querySelector(".card__image"),a=u.querySelector(".card__like-button"),s=u.querySelector(".card__delete-button"),l=u.querySelector(".card");return d.textContent=c,i.src=p,i.alt=c,i.addEventListener("click",(function(){return n({name:c,link:p})})),a.addEventListener("click",o),s.addEventListener("click",(function(){return r(l)})),u}function n(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.remove()}function r(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){e.target.classList.contains("popup")&&c(e.target)}function d(e){c(e.target.closest(".popup"))}var i=document.querySelector(".places__list"),a=document.forms["edit-profile"],s=document.forms["new-place"],l=document.querySelectorAll(".popup"),m=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),y=document.querySelector(".popup_type_image"),f=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=document.querySelector(".popup__input_type_name"),g=document.querySelector(".popup__input_type_description"),L=document.querySelector(".popup__input_type_card-name"),E=document.querySelector(".popup__input_type_url"),h=y.querySelector(".popup__image"),x=y.querySelector(".popup__caption");function b(e){h.src=e.link,h.alt=e.name,x.textContent=e.name,r(y)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){i.append(t(e,b,n,o))})),l.forEach((function(e){e.addEventListener("click",u),e.querySelector(".popup__close").addEventListener("click",d)})),f.addEventListener("click",(function(){S.value=k.textContent,g.value=q.textContent,r(m)})),a.addEventListener("submit",(function(e){e.preventDefault(),k.textContent=S.value,q.textContent=g.value,c(m)})),v.addEventListener("click",(function(){r(_)})),s.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:L.value,link:E.value},b,n,o);i.prepend(r),c(_),s.reset()}))})();