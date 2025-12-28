import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import { initFilters } from './filters.js';
import { showAlert } from './util.js';
import './form.js';

const init = async () => {
  try {
    const picturesData = await getData();
    renderPhotos(picturesData);
    initFilters(picturesData, renderPhotos);
  } catch (err) {
    showAlert(err.message);
  }
};

init();
