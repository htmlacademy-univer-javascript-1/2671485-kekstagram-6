import { debounce } from './util.js';

// Константы
const RANDOM_PHOTOS_COUNT = 10;
const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

let currentPhotos = [];
let currentFilter = FilterType.DEFAULT;

// DOM элементы
const filtersElement = document.querySelector('.img-filters');
const filterButtons = filtersElement.querySelectorAll('.img-filters__button');

// Функции фильтрации
const getDefaultPhotos = () => [...currentPhotos];

const getRandomPhotos = () => {
  const photosCopy = [...currentPhotos];
  const randomPhotos = [];

  for (let i = 0; i < RANDOM_PHOTOS_COUNT && photosCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * photosCopy.length);
    randomPhotos.push(photosCopy[randomIndex]);
    photosCopy.splice(randomIndex, 1);
  }

  return randomPhotos;
};

const getDiscussedPhotos = () => [...currentPhotos].sort((a, b) => b.comments.length - a.comments.length);

// Получение отфильтрованных фото
const getFilteredPhotos = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return getRandomPhotos();
    case FilterType.DISCUSSED:
      return getDiscussedPhotos();
    case FilterType.DEFAULT:
    default:
      return getDefaultPhotos();
  }
};

// Обновление активной кнопки
const updateActiveButton = (activeButtonId) => {
  filterButtons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button.id === activeButtonId);
  });
};

// Очистка фотографий
const clearPhotos = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

// Инициализация фильтров
const initFilters = (photos, renderFunction) => {
  currentPhotos = photos;

  // Показываем фильтры
  filtersElement.classList.remove('img-filters--inactive');

  // Создаем debounced версию рендеринга
  const debouncedRender = debounce((filteredPhotos) => {
    clearPhotos();
    renderFunction(filteredPhotos);
  }, 500);

  // Обработчик клика
  const onFilterButtonClick = (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedFilter = evt.target.id.replace('filter-', '');

    if (clickedFilter === currentFilter) {
      return;
    }

    updateActiveButton(evt.target.id);
    currentFilter = clickedFilter;

    debouncedRender(getFilteredPhotos());
  };

  // Добавляем обработчики
  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterButtonClick);
  });
};

export { initFilters };
