import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture');

const renderPhoto = (picture) => {
  const { url, description, comments, likes } = picture;
  const pictureElement = pictureTemplate.content.cloneNode(true);
  const pictureLink = pictureElement.querySelector('.picture');

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const renderPhotos = (photos) => {
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  container.appendChild(fragment);
};

export { renderPhotos };
