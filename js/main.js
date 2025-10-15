import {generateUniqueIteger, getRandomArrayElement, getRandomInteger} from './util.js';
import {DESCRIPTIONS} from './data.js';
import {createComm} from './comment-generator.js';

const generatePhotoId = generateUniqueIteger(1, 25);
const generateUrl = generateUniqueIteger(1, 25);
const generateLikes = generateUniqueIteger(15, 200);

const createPerson = () => ({
  id: generatePhotoId(),
  url: `photos/${  generateUrl()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikes(),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComm),
});

createPerson();
