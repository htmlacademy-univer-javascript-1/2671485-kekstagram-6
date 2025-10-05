const DESCRIPTIONS = [
  'Прекрасный закат на море',
  'Горный пейзаж ранним утром',
  'Улочки старого города',
  'Кофе в уютной кофейне',
  'Прогулка по осеннему парку',
  'Архитектура современного мегаполиса',
  'Момент из путешествия',
  'Тихий вечер дома',
  'Яркие краски лета',
  'Зимняя сказка в лесу',
  'Уличное искусство и граффити',
  'Морской бриз и пляж',
  'Городские огни ночью',
  'Природа в её лучшем проявлении',
  'Моменты счастливой жизни'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей',
  'Елена', 'Алексей', 'Ольга', 'Иван', 'Наталья',
  'Павел', 'Виктория', 'Михаил', 'Юлия', 'Андрей'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const generateUniqueIteger = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      previousValues.length = 0;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  return Array.from({ length: count }, () => getRandomArrayElement(MESSAGES)).join(' ');
};

const generatePhotoId = generateUniqueIteger(1, 25);
const generateUrl = generateUniqueIteger(1, 25);
const generateLikes = generateUniqueIteger(15, 200);
const generateCommId = generateUniqueIteger(1, 30);

const createComm = () => ({
  id: generateCommId(),
  url: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPerson = () => ({
  id: generatePhotoId(),
  url: `photos/${  generateUrl()  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: generateLikes(),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComm),
});

createPerson();
