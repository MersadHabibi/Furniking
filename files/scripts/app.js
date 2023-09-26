let $ = document;
let HtmlElem = $.querySelector("html");
let allCollectionMenu = $.querySelector(".header-content__collections");
let allCollectionPopupMenu = $.querySelector(".all-collections__popup-list");
let allCollectionMenuBtn = $.querySelector(".nav-bar__all-collections");
let mobileMenu = $.querySelector(".mobile-menu");
//search bar elements
let popupSearchBar = $.querySelector(".popup-search-bar");
let popupSearchBarSearchBtn = $.querySelector(
  ".popup-search-bar .popup-search-bar__search-btn"
);
let popupSearchBarCloseBtn = $.querySelector(
  ".popup-search-bar .popup-search-bar__close-btn"
);
let popupSearchBarInput = $.querySelector(
  ".popup-search-bar .popup-search-bar__input"
);
let popupSearchBarCategory = $.querySelector(
  ".popup-search-bar .popup-search-bar__category"
);
let searchBtn = $.querySelector(".search-bar__btn");
let searchInput = $.querySelector(".search-bar__input");
let searchCategory = $.querySelector(".search-bar__categories");
//
//trending elements
let trendingMenuLink = $.querySelectorAll(".trending-sec__menu-item");
let trendingContent = $.querySelectorAll(".trending-sec__content");

//
let mobileMenuCover = $.querySelector(".cover");
let menuActive = false;
let searchBarActive = false;
let windowSize = window.innerWidth;

// create menu popup
if (windowSize <= 1400) {
  let popupUl = $.createElement("ul");
  _addRemoveClass("add", popupUl, "header-content__collections");
  popupUl.style.display = "block";
  popupUl.innerHTML = allCollectionMenu.innerHTML;
  allCollectionPopupMenu.append(popupUl);
}
//add categories in popup search bar
function addCategories() {
  popupSearchBarCategory.innerHTML = searchCategory.innerHTML;
  popupSearchBarCategory.value = searchCategory.value;
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
  _addRemoveClass(
    "toggle",
    allCollectionPopupMenu,
    "all-collections__popup-list--open"
  );
  openMenu();
});
// open popup search bar
searchBtn.addEventListener("click", openSearchBar);
searchInput.addEventListener("click", openSearchBar);
// open popup search bar
popupSearchBarCloseBtn.addEventListener("click", closeSearchBar);
// change content trending section
trendingMenuLink.forEach((e) => {
  e.addEventListener("click", changeTrendingContent);
});

//

// Functions

//

//open mobile menu
function openMenu() {
  console.log("open mobile menu");
  _addRemoveClass("add", mobileMenu, "mobile-menu--open");
  _addRemoveClass("add", mobileMenuCover, "cover--active");
  if (windowSize <= 992) {
    HtmlElem.style.scrollBehavior = "unset";
  }
}
//close mobile menu
function closeMenu() {
  console.log("close mobile menu");
  _addRemoveClass("remove", mobileMenu, "mobile-menu--open");
  _addRemoveClass("remove", mobileMenuCover, "cover--active");
  HtmlElem.style.scrollBehavior = "smooth";
  menuActive = false;
}
//open popup search bar
function openSearchBar() {
  _addRemoveClass("add", popupSearchBar, "popup-search-bar--open");
  addCategories();
  popupSearchBarInput.focus();
}
//close popup search bar
function closeSearchBar() {
  _addRemoveClass("remove", popupSearchBar, "popup-search-bar--open");
}
// change trending content
function changeTrendingContent() {
  let activeBtn = $.querySelector(".trending-sec__menu--active");
  _addRemoveClass("remove", activeBtn, "trending-sec__menu--active");
  _addRemoveClass("add", this, "trending-sec__menu--active");
  let datasetValue = this.dataset.content;
  trendingContent.forEach((e) => {
    if (e.id != datasetValue) {
      _addRemoveClass("remove", e, "trending-sec__content--active");
    } else {
      _addRemoveClass("add", e, "trending-sec__content--active");
    }
  });
}

//

// Helper functions

//

// add class function
function _addRemoveClass(action, element, classes) {
  if (action == "add") {
    element.classList.add(`${classes}`);
  } else if (action == "remove") {
    element.classList.remove(`${classes}`);
  } else if (action == "toggle") {
    element.classList.toggle(`${classes}`);
  } else {
    console.log(
      "action not true",
      ` element:${element} classes:${classes} action:${action}`
    );
  }
}
function _changeDisplay(element, styleValue) {
  element.style.display = styleValue;
}

//

// slider

//

// header banner slider
var swiper = new Swiper(".header-content__banner .mySwiper", {
  pagination: {
    el: ".header-content__banner .swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
// popup search bar slider
var swiper = new Swiper(".popup-search-bar .mySwiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  scrollbar: {
    el: ".popup-search-bar .swiper-scrollbar",
  },
  mousewheel: true,
});
// trending section slider
var swiper = new Swiper(".trending-sec__content .mySwiper", {
  slidesPerView: 4,
  grid: {
    fill: "row",
    rows: 2,
  },
  spaceBetween: 10,
  pagination: {
    el: ".trending-sec .swiper-pagination",
    clickable: true,
  },
});
