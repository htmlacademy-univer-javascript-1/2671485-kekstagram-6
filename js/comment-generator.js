import { MESSAGES, NAMES } from './data.js';
import { getRandomInteger, getRandomArrayElement, generateUniqueIteger } from './util.js';

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  return Array.from({ length: count }, () => getRandomArrayElement(MESSAGES)).join(' ');
};

const generateCommId = generateUniqueIteger(1, 30);

const createComm = () => ({
  id: generateCommId(),
  url: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

export {createComm};
