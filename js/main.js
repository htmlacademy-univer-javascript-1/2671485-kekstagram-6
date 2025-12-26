import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import { initFilters } from './filters.js';
import './form.js';

const init = async () => {
  const picturesData = await getData();
  renderPhotos(picturesData);
  initFilters(picturesData, renderPhotos);
};

init();
