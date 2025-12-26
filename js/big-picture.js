import { isEscapeKey } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentComments = [];
let commentsShown = 0;

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(img);
  commentElement.appendChild(text);

  return commentElement;
};

const renderComments = () => {
  const commentsPortion = currentComments.slice(commentsShown, commentsShown + COMMENTS_STEP);
  const fragment = document.createDocumentFragment();

  commentsPortion.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialComments.appendChild(fragment);
  commentsShown += commentsPortion.length;

  commentCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;

  if (commentsShown >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const toggleModal = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const fillPictureData = (picture) => {
  const { url, description, likes, comments } = picture;

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
};

const openBigPicture = (picture) => {
  currentComments = picture.comments.slice();
  commentsShown = 0;

  socialComments.innerHTML = '';
  fillPictureData(picture);

  commentCountElement.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderComments();
  toggleModal();
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const closeBigPicture = () => {
  toggleModal();
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const onCancelButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

cancelButton.addEventListener('click', onCancelButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export { openBigPicture };
