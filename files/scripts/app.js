let $ = document;
let HtmlElem = $.querySelector("html");
let allCollectionMenu = $.querySelector(".header-content__collections");
let allCollectionPopupMenu = $.querySelector(".all-collections__popup-list");
let allCollectionMenuBtn = $.querySelector(".nav-bar__all-collections");
let mobileMenu = $.querySelector(".mobile-menu");
let searchBtn = $.querySelector(".search-bar__btn");
let mobileSearchBar = $.querySelector(".mobile-search-bar");
let mobileMenuCover = $.querySelector(".cover");
let searchBarInput = $.querySelector(".search-bar__input");
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
// open search Bar
searchBtn.addEventListener("click", openSearchBar);
searchBarInput.addEventListener("focus" , ()=>{
  console.log(searchBarActive);
  if(searchBarActive == true){
    return
  }
  else{
    openSearchBar();
  }
})
//close search Bar
mobileSearchBar.addEventListener("click", closeSearchBar , false);

//
// Functions
//

//open mobile menu
function openMenu() {
  mobileMenu.classList.add("mobile-menu--open");
  mobileMenuCover.classList.add("cover--active");
  if (windowSize <= 992) {
    HtmlElem.style.scrollBehavior = "unset";
  }
}
//close mobile menu
function closeMenu() {
  mobileMenu.classList.remove("mobile-menu--open");
  mobileMenuCover.classList.remove("cover--active");
  HtmlElem.style.scrollBehavior = "smooth";
  menuActive = false;
}
// open mobile search bar
function openSearchBar() {
  let searchBarInput = $.querySelector(".mobile-search-bar .search-bar__input");
  searchBarInput.focus();
  mobileSearchBar.classList.add("mobile-search-bar--open");
  HtmlElem.style.scrollBehavior = "unset";
  searchBarActive = true;
}
// close mobile search bar
function closeSearchBar() {
  console.log('close search bar with mobileSearchBar');
  mobileSearchBar.classList.remove("mobile-search-bar--open");
  HtmlElem.style.scrollBehavior = "smooth";
  searchBarActive = false;
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
