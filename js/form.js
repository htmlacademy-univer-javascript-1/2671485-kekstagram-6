import { isEscapeKey } from './util.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const body = document.body;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

let errorMessage = '';
const error = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги должны разделяться пробелами'
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #'
    },
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хэш-тег не может состоять только из #'
    },
    {
      check: inputArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина хэштега ${MAX_HASHTAG_SYMBOLS} символов`
    },
    {
      check: !inputArray.every((item) => HASHTAG_REGEX.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    },
    {
      check: new Set(inputArray).size !== inputArray.length,
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хэш-тегов`
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const commentHandler = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagInput, hashtagsHandler, error, 2, false);

pristine.addValidator(
  commentInput,
  commentHandler,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
  2,
  false
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onHashtagInput = () => {
  if (pristine.validate()) {
    unblockSubmitButton();
  } else {
    blockSubmitButton();
  }
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  if (window.escKeydownHandler) {
    document.removeEventListener('keydown', window.escKeydownHandler);
    window.escKeydownHandler = null;
  }

  form.reset();
  pristine.reset();
  blockSubmitButton();
};

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  window.escKeydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      if (document.activeElement === hashtagInput || document.activeElement === commentInput) {
        evt.stopPropagation();
        return;
      }
      evt.preventDefault();
      closeForm();
    }
  };

  document.addEventListener('keydown', window.escKeydownHandler);

  onHashtagInput();
};

const onFileChange = () => {
  openForm();
};

const onCancelClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  setTimeout(() => {
    unblockSubmitButton();
  }, 2000);
};

const stopEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const initForm = () => {
  fileInput.addEventListener('change', onFileChange);
  cancelButton.addEventListener('click', onCancelClick);
  form.addEventListener('submit', onFormSubmit);

  hashtagInput.addEventListener('input', onHashtagInput);

  commentInput.addEventListener('input', onHashtagInput);

  hashtagInput.addEventListener('keydown', stopEscPropagation);
  commentInput.addEventListener('keydown', stopEscPropagation);

  blockSubmitButton();
};

initForm();

export { closeForm };
