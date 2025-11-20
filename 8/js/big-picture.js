const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.url;
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

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });

  socialComments.appendChild(fragment);
};

const toggleModal = () => {
  bigPicture.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
};

const toggleCommentsCounter = () => {
  commentCountElement.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
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
  fillPictureData(picture);
  renderComments(picture.comments);
  toggleCommentsCounter();
  toggleModal();
};

const closeBigPicture = () => {
  toggleModal();
  toggleCommentsCounter();
};

const onCancelButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

cancelButton.addEventListener('click', onCancelButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export { openBigPicture };
