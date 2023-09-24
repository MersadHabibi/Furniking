let $ = document;
let HtmlElem = $.querySelector("html");
let allCollectionMenu = $.querySelector(".header-content__collections");
let allCollectionPopupMenu = $.querySelector(".all-collections__popup-list");
let allCollectionMenuBtn = $.querySelector(".nav-bar__all-collections");
let mobileMenu = $.querySelector(".mobile-menu");
let searchBtn = $.querySelector(".search-bar__btn");
let mobileMenuCover = $.querySelector(".cover");
let menuActive = false;
let searchBarActive = false;
let windowSize = window.innerWidth;

// create popup
if (windowSize <= 1400) {
  let popupUl = $.createElement("ul");
  popupUl.classList.add("header-content__collections");
  popupUl.style.display = "block";
  popupUl.innerHTML = allCollectionMenu.innerHTML;
  allCollectionPopupMenu.append(popupUl);
}

//
// Events
//

// lock scroll when mobile menu is open
window.addEventListener("scroll", (e) => {
  if ((menuActive == false && searchBarActive == false) || windowSize >= 992) {
    return;
  } else if (menuActive == true || searchBarActive == true) {
    scroll(0, 0);
  }
});
// close mobile menu
mobileMenuCover.addEventListener("click", () => {
  closeMenu();
});
// open menu
allCollectionMenuBtn.addEventListener("click", () => {
  menuActive = true;
  // open popup
  allCollectionPopupMenu.classList.toggle("all-collections__popup-list--open");
  openMenu();
});

//
// Functions
//

//open mobile menu
function openMenu() {
  console.log("open mobile menu");
  mobileMenu.classList.add("mobile-menu--open");
  mobileMenuCover.classList.add("cover--active");
  if (windowSize <= 992) {
    HtmlElem.style.scrollBehavior = "unset";
  }
}
//close mobile menu
function closeMenu() {
  console.log("close mobile menu");
  mobileMenu.classList.remove("mobile-menu--open");
  mobileMenuCover.classList.remove("cover--active");
  HtmlElem.style.scrollBehavior = "smooth";
  menuActive = false;
}

//
// slider
//

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

//
// Helper functions
//

// add class function
function _addRemoveClass(action, element, classes) {
  if (action == "add") {
    element.classList.add(`${classes}`);
  } else if (action == "remove") {
    element.classList.remove(`${classes}`);
  } else {
    console.log(
      "action not true",
      ` element:${element} classes:${classes} action:${action}`
    );
  }
}
