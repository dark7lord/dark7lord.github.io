// Карта Яндекс с кастомным маркером

ymaps.ready(function () {
  let myMap = new ymaps.Map('map', {
          center: [59.938635, 30.323118],
          zoom: 17
      }, {
          searchControlProvider: 'yandex#search'
      }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      ),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Собственный значок метки',
          balloonContent: 'Студия Нёрдс'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'img/map-marker.png',
          iconImageSize: [231, 190],
          iconImageOffset: [-60, -170]
      });

  myMap.geoObjects.add(myPlacemark);
  myMap.behaviors.disable('scrollZoom'); // Убрать прокрутку карты колесиком мыши
  myMap.controls.remove('searchControl'); // Удалил поисковую строку, так как оно частично перекрывается контактами
});


// Форма "Напишите нам"

let btnOpenModal = document.querySelector('.map__btn-open-modal');
let modalCallback = document.querySelector('.modal-callback');
let btnCloseModal = document.querySelector('.modal-callback__btn-close');
let inputName = document.querySelector('.modal-callback__input-text--name');
let inputEmail = document.querySelector('.modal-callback__input-text--email');
let inputComment = document.querySelector('.modal-callback__textarea');
let btnSubmitModal = document.querySelector('.modal-callback__btn-submit');

let isStorageSupport = true;

try {
  var storageName = localStorage.getItem('name');
  var storageEmail = localStorage.getItem('email');
} catch(error) {
  isStorageSupport = false;
  console.log(error);
}

btnOpenModal.addEventListener('click', function(event) {
  event.preventDefault();
  modalCallback.classList.add('modal-callback--opened');
  inputName.focus();

  if (storageName) {
    inputName.value = storageName;
    inputEmail.focus();
  } else {
    inputName.focus();
  }

  if (storageEmail) {
    inputEmail.value = storageEmail;
    inputComment.focus();
  }
});

btnCloseModal.addEventListener('click', function(event) {
  modalCallback.classList.remove('modal-callback--opened');
  modalCallback.classList.remove('modal-callback--error');
});

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    if (modalCallback.classList.contains('modal-callback--opened')) {
      event.preventDefault();
      modalCallback.classList.remove('modal-callback--opened');
      modalCallback.classList.remove('modal-callback--error');
    }
  }
} );

btnSubmitModal.addEventListener('click', function(event) {
  if (! inputName.value || ! inputEmail.value || ! inputComment.value) {
    event.preventDefault();
    modalCallback.classList.remove('modal-callback--error');
    modalCallback.offsetWidth = modalCallback.offsetWidth; // не понимаю этот хак =(
      modalCallback.classList.add('modal-callback--error');
      inputName.required = true;
      inputEmail.required = true;
      inputComment.required = true;
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', inputName.value);
      localStorage.setItem('email', inputEmail.value);
    }
  }
});

// Слайдер на главной

let buttons = document.querySelectorAll('.promo-slider__btn');
let slides = document.querySelectorAll('.slide');

buttons.forEach((btn, btnIndex) => {
  btn.addEventListener('click', (evt) => {
    for (button of buttons) {
      button.classList.remove('promo-slider__btn--active');
    }

    evt.target.classList.add('promo-slider__btn--active');

    slides.forEach((slide, slideIndex) => {
      if (btnIndex === slideIndex) {
        slide.classList.add('slide--active');
      } else {
        slide.classList.remove('slide--active');
      }
    })
  })
});


// Ползунок диапазона цен в "Магазине"

let startPriceInput = document.querySelector('#start-price');
let endPriceInput = document.querySelector('#end-price');
let rangeToggleMin = document.querySelector('.range__toggle--min');
let rangeToggleMax = document.querySelector('.range__toggle--max');
let rangeBar = document.querySelector('.range__bar');

rangeToggleMin.addEventListener('mousedown', (evt) => {
  let startX = evt.clientX;

  let onMouseMove = (moveEvt) => {
    let shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    rangeToggleMin.style.left = (rangeToggleMin.offsetLeft - shift) + `px`;

    if ((rangeToggleMin.offsetLeft - shift) < 0) {
      rangeToggleMin.style.left = 0 + 'px';
    }

    if ((rangeToggleMin.offsetLeft - shift) > 220) {
      rangeToggleMin.style.left = 220 + 'px';
    }

    startPriceInput.value = Math.floor(rangeToggleMin.style.left.slice(0, -2) / 220 * startPriceInput.max);
    rangeBar.style.marginLeft = rangeToggleMin.style.left;
  };

  let onMouseUp = function (upEvt) {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

rangeToggleMax.addEventListener('mousedown', (evt) => {
  let startX = evt.clientX;

  let onMouseMove = (moveEvt) => {
    let shift = startX - moveEvt.clientX;
    startX = moveEvt.clientX;
    rangeToggleMax.style.left = (rangeToggleMax.offsetLeft - shift) + `px`;

    if ((rangeToggleMax.offsetLeft - shift) < 0) {
      rangeToggleMax.style.left = 0 + 'px';
    }

    if ((rangeToggleMax.offsetLeft - shift) > 220) {
      rangeToggleMax.style.left = 220 + 'px';
    }

    endPriceInput.value = Math.floor(rangeToggleMax.style.left.slice(0, -2) / 220 * endPriceInput.max);
    rangeBar.style.marginRight = 220 - rangeToggleMax.style.left.slice(0, -2) + 'px';
  };

  let onMouseUp = function (upEvt) {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
