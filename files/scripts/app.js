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
// special offer elements
let offerDayTime = $.querySelectorAll(".offer-day");
let offerHourTime = $.querySelectorAll(".offer-hour");
let offerMinTime = $.querySelectorAll(".offer-minute");
let offerSecTime = $.querySelectorAll(".offer-second");
//
//products section elements
let productsMenuLink = $.querySelectorAll(".products__menu-link");
let productsContent = $.querySelectorAll(".product-content");

//
// product
let product = $.querySelectorAll(".product");
//
let mobileMenuCover = $.querySelector(".cover");
let menuActive = false;
let searchBarActive = false;
let windowSize = window.innerWidth;
let specialOfferInterval;

// create menu popup
if (windowSize <= 1400) {
  let popupUl = $.createElement("ul");
  _addRemoveClass("add", popupUl, "header-content__collections");
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
// click on product
product.forEach((e) => {
  e.addEventListener("click", activeProduct);
});
// change content products section
productsMenuLink.forEach((e) => {
  e.addEventListener("click", changeProductsContent);
});

//

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
// active trending product on click
function activeProduct() {
  let activeElement = $.querySelector(".product--active");
  if (activeElement)
    _addRemoveClass("remove", activeElement, "product--active");
  _addRemoveClass("add", this, "product--active");
  console.log("click");
}
// special offer timer
function specialOfferTimer(
  dayElem,
  hourElem,
  minElem,
  secElem,
  time = "2:10:20:30"
) {
  time = time.split(":");
  [
    dayElem.innerHTML,
    hourElem.innerHTML,
    minElem.innerHTML,
    secElem.innerHTML,
  ] = time;
  let interVal = setInterval(() => {
    time[3] = time[3] - 1;
    if (time[3] < 0) {
      time[3] = 60;
      time[2] = time[2] - 1;
      if (time[2] < 0) {
        time[2] = 59;
        time[1] = time[1] - 1;
        if (time[1] < 0) {
          time[1] = 23;
          time[0] = time[0] - 1;
          if (time[0] < 1) {
            clearInterval(interVal);
            [time[0], time[1], time[2], time[3]] = [0, 0, 0, 0];
          }
        }
      }
    }
    time[0] = time[0].toString().length == 1 ? `0${time[0]}` : time[0];
    time[1] = time[1].toString().length == 1 ? `0${time[1]}` : time[1];
    time[2] = time[2].toString().length == 1 ? `0${time[2]}` : time[2];
    time[3] = time[3].toString().length == 1 ? `0${time[3]}` : time[3];
    [
      dayElem.innerHTML,
      hourElem.innerHTML,
      minElem.innerHTML,
      secElem.innerHTML,
    ] = time;
  }, 1000);
}
specialOfferTimer(
  offerDayTime[0],
  offerHourTime[0],
  offerMinTime[0],
  offerSecTime[0],
  "1:03:40:03"
);
specialOfferTimer(
  offerDayTime[1],
  offerHourTime[1],
  offerMinTime[1],
  offerSecTime[1],
  "3:01:10:00"
);
// change product content
function changeProductsContent() {
  let activeBtn = $.querySelector(".products__menu-item--active");
  console.log(activeBtn);
  _addRemoveClass("remove", activeBtn, "products__menu-item--active");
  _addRemoveClass("add", this, "products__menu-item--active");
  let datasetValue = this.dataset.content;
  console.log(this);
  productsContent.forEach((e) => {
    if (e.id != datasetValue) {
      _addRemoveClass("remove", e, "product-content--active");
    } else {
      _addRemoveClass("add", e, "product-content--active");
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
let headerBannerSlider = new Swiper(".header-content__banner .mySwiper", {
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
let searchBarSlider = new Swiper(".popup-search-bar .mySwiper", {
  direction: "vertical",
  slidesPerView: "auto",
  freeMode: true,
  scrollbar: {
    el: ".popup-search-bar .swiper-scrollbar",
  },
  mousewheel: true,
});
// trending section slider
let trendingSectionSlider = new Swiper(".trending-sec__content .mySwiper", {
  pagination: {
    el: ".trending-sec .swiper-pagination",
    clickable: true,
  },
  grid: {
    fill: "row",
    rows: 2,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 25,
      grid: {
        fill: "row",
        rows: 1,
      },
    },
    0: {
      slidesPerView: 1,
      grid: {
        fill: "row",
        rows: 1,
      },
    },
  },
});
// our products slider
let productsSectionSlider = new Swiper(".products .mySwiper", {
  pagination: {
    el: ".products .swiper-pagination",
    clickable: true,
  },
  grid: {
    fill: "row",
    rows: 2,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 25,
      grid: {
        fill: "row",
        rows: 1,
      },
    },
    0: {
      slidesPerView: 1,
      grid: {
        fill: "row",
        rows: 1,
      },
    },
  },
});
// comments section slider
let commentsSlider = new Swiper(".comments-sec .mySwiper", {
  spaceBetween: 50,
  navigation: {
    nextEl: ".comments-sec .swiper-button-next",
    prevEl: ".comments-sec .swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});
