var buttonSearch = document.querySelector(".button-search");
var searchHotelForm = document.querySelector(".search-hotels");
var formSearchHotels = document.querySelector(".search-hotels");
var dataArrival = formSearchHotels.querySelector("[name=date-arrival]");
var dataDeparture = formSearchHotels.querySelector("[name=date-departure]");
var numberMans = formSearchHotels.querySelector("[name=number-mans]");
var numberChilds = formSearchHotels.querySelector("[name=number-childs]");
var buttonSubmit = formSearchHotels.querySelector(".button-submit");
var isStorageSupport = true;
var storage = "";

searchHotelForm.classList.remove("search-hotels-show");

try {
  storage = localStorage.getItem("dataArrival");
  storage = localStorage.getItem("dataDeparture");
  storage = localStorage.getItem("numberMans");
  storage = localStorage.getItem("numberChilds");
} catch (err) {
  isStorageSupport = false;
}

buttonSearch.addEventListener("click", function (evt) {
  evt.preventDefault();
  searchHotelForm.classList.toggle("search-hotels-show");
});

buttonSubmit.addEventListener("click", function (evt) {
  if (!dataArrival.value || !dataDeparture.value || !numberMans.value || !numberChilds.value) {
    evt.stopPropagation();
    evt.preventDefault();

    setTimeout(function () {
      searchHotelForm.classList.add("search-hotels-error");
    }, 100);
    searchHotelForm.classList.remove("search-hotels-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("dataArrival", dataArrival.value);
      localStorage.setItem("dataArrival", dataDeparture.value);
      localStorage.setItem("dataArrival", numberMans.value);
      localStorage.setItem("dataArrival", numberChilds.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (searchHotelForm.classList.contains("search-hotels-show")) {
      searchHotelForm.classList.remove("search-hotels-show");
      searchHotelForm.classList.remove("search-hotels-error");
    }
  }
});
