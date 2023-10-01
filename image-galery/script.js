import words from './searchList.js';
import API_KEY from './key.js';
// console.log(words);
// console.log(API_KEY);

const searchInp = document.querySelector('.search');
const wrapperGallery = document.querySelector('.wrapper__gallery');
const searchIcon = document.querySelector('.search-icon');
const form = document.querySelector('.form__search');
const subtitle = document.querySelector('.subtitle');

let page = 1;
let inputDataQuery = '';

//todo Для начального показа на странице
const searchImage = async () => {
  // присваиваю значение поля поиска
  inputDataQuery = searchInp.value;
  subtitle.innerHTML = inputDataQuery;
  //   console.log(inputDataQuery);
  if (inputDataQuery === '') {
    let randomIndexQuery = Math.floor(Math.random() * words.length);
    subtitle.innerHTML = words[randomIndexQuery];
    fetchImages(words[randomIndexQuery]);
    // console.log(words[randomIndexQuery]);
  } else {
    // inputDataQuery = searchInp.value;
    fetchImages(inputDataQuery);
    // console.log(inputDataQuery);
  }
};

//todo Для выбора который прописываю в поле input, получаю список из сайта
const fetchImages = async (inputDataQuery) => {
  try {
    const url = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&page=${page}&query=${inputDataQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(url);
    if (response.status == '200') {
      // получаемые фото
      const arrayImages = data.results;
      // console.log(arrayImages);
      setImages(arrayImages);
    }
  } catch (err) {
    console.log(err);
  }
};

//todo создаю элементы для отображения полученые с сайта
const setImages = (arrayImages) => {
  // очищаю все для отображения новых картинок
  wrapperGallery.innerHTML = '';
  // console.log(arrayImages);

  // перебираю полученые изображения
  arrayImages.map((item) => {
    const wrapperImg = document.createElement('div');
    wrapperImg.classList.add('wrapper__img');

    const galleryImg = document.createElement('img');
    galleryImg.classList.add('gallery-img');
    galleryImg.src = item.urls.regular;
    galleryImg.alt = item.alt;

    wrapperImg.appendChild(galleryImg);
    wrapperGallery.appendChild(wrapperImg);

    autoRotateImages(galleryImg);
  });
};

// todo по клику на иконку поиска запускаю все заново
function getInputValue(event) {
  // останавливаю стандартное поведение формы
  event.preventDefault();
  // console.log(searchInp.value);
  searchImage();
}
searchIcon.addEventListener('click', getInputValue);

// todo при отправке формы запускаю все заново
form.addEventListener('submit', (event) => {
  // останавливаю стандартное поведение формы
  event.preventDefault();
  searchImage();
});

//todo при каждом обновлении страницы
onload = searchImage();

// todo анимация картинок
function autoRotateImages(element) {
  let rotated = false;
  setInterval(function () {
    if (rotated) {
      element.style.transform = 'rotateY(0deg)';
    } else {
      element.style.transform = 'rotateY(180deg)';
    }
    rotated = true;
  }, 2000);
}
