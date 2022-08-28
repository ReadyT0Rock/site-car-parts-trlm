var navMain = document.querySelector(".navigation");
var navToggle = document.querySelector(".header-top__toggle--close");
var navDecorate = document.querySelector(".header-top__toggle-decorate");

navToggle.classList.remove("header-top__toggle--nojs");
navMain.classList.remove("navigation--nojs");
navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("navigation--closed")) {
    navMain.classList.remove("navigation--closed");
    navMain.classList.add("navigation--opened");
    navDecorate.classList.add("header-top__toggle-decorate--close");
  } else {
    navMain.classList.add("navigation--closed");
    navMain.classList.remove("navigation--opened");
    navDecorate.classList.remove("header-top__toggle-decorate--close");
  }
});

var informationMain = document.querySelector(".footer__list--information");
var informationToggle = document.querySelector(".footer__text--information");

informationMain.classList.remove("footer__list--nojs");
informationToggle.addEventListener("click", function () {
  if (informationMain.classList.contains("footer__list--information-closed")) {
    informationMain.classList.remove("footer__list--information-closed");
    informationMain.classList.add("footer__list--information-opened");
  } else {
    informationMain.classList.add("footer__list--information-closed");
    informationMain.classList.remove("footer__list--information-opened");
  }
});

var storeMain = document.querySelector(".footer__list--store");
var storeToggle = document.querySelector(".footer__text--store");

storeMain.classList.remove("footer__list--nojs");
storeToggle.addEventListener("click", function () {
  if (storeMain.classList.contains("footer__list--store-closed")) {
    storeMain.classList.remove("footer__list--store-closed");
    storeMain.classList.add("footer__list--store-opened");
  } else {
    storeMain.classList.add("footer__list--store-closed");
    storeMain.classList.remove("footer__list--store-opened");
  }
});
