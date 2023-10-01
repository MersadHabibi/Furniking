let $ = document;
let allCollectionPopupMenu = $.querySelector(".all-collections__popup-list");
let allCollectionMenuBtn = $.querySelector(".nav-bar__all-collections");
let mobileMenu = $.querySelector(".mobile-menu");
let mobileMenuCover = $.querySelector(".cover");

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

let menuActive = false;
let searchBarActive = false;

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
// close popup search bar
popupSearchBarCloseBtn.addEventListener("click", closeSearchBar);

//

// Functions

//

//add categories in popup search bar
function addCategories() {
  popupSearchBarCategory.innerHTML = searchCategory.innerHTML;
  popupSearchBarCategory.value = searchCategory.value;
}
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