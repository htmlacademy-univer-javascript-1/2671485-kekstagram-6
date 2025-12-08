import { generatePhotos } from './data-generator.js';
import { renderPhotos } from './pictures.js';
import './form.js';

const picturesData = generatePhotos();
renderPhotos(picturesData);
