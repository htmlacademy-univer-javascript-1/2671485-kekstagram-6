import { getData } from './api.js';
import { renderPhotos } from './pictures.js';
import './form.js';

const init = async () => {
  const picturesData = await getData();
  renderPhotos(picturesData);
};

init();
