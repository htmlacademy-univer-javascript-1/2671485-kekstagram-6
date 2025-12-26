import { MESSAGES, NAMES, DESCRIPTIONS } from './data.js';
import { getRandomInteger, getRandomArrayElement, generateUniqueIteger } from './util.js';

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  return Array.from({ length: count }, () => getRandomArrayElement(MESSAGES)).join(' ');
};

const generateCommId = generateUniqueIteger(1, 30);

const createComm = () => ({
  id: generateCommId(),
  url: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

const generatePhotos = () => {
  const generatePhotoId = generateUniqueIteger(1, 25);
  const generateUrl = generateUniqueIteger(1, 25);
  const generateLikes = generateUniqueIteger(15, 200);

  const createPhoto = () => ({
    id: generatePhotoId(),
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: generateLikes(),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createComm),
  });

  return Array.from({ length: 25 }, createPhoto);
};

export { generatePhotos };
