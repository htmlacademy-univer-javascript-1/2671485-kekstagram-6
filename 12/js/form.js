import { isEscapeKey } from './util.js';
import { initSlider, onEffectChange, resetEffects } from './effects.js';
import { sendData } from './api.js';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_SYMBOLS = 20;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

// Константы для масштабирования
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('#upload-cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const body = document.body;

// Элементы для масштабирования
const scaleControlSmaller = form.querySelector('.scale__control--smaller');
const scaleControlBigger = form.querySelector('.scale__control--bigger');
const scaleControlValue = form.querySelector('.scale__control--value');
const imagePreview = form.querySelector('.img-upload__preview img');

// Элементы для эффектов
const effectsList = form.querySelector('.effects__list');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = form.querySelector('.effect-level__value');
const effectLevelSlider = form.querySelector('.effect-level__slider');

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

const scaleImage = (value) => {
  scaleControlValue.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, SCALE_MIN);
  scaleImage(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, SCALE_MAX);
  scaleImage(newValue);
};

// Валидация хэштегов
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
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
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

  scaleImage(SCALE_DEFAULT);
  resetEffects(imagePreview);

  const originalEffect = form.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }

  initSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);

  unblockSubmitButton();

  fileInput.value = '';
};

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleImage(SCALE_DEFAULT);
  resetEffects(imagePreview);

  const originalEffect = form.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }

  initSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);

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
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }

  openForm();
};

const onCancelClick = () => {
  closeForm();
};

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const showMessage = (template) => {
  const messageFragment = template.content.cloneNode(true);
  const message = messageFragment.querySelector('.error, .success');
  const button = message.querySelector('.error__button, .success__button');

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (!evt.target.closest('.error__inner, .success__inner')) {
      closeMessage();
    }
  }

  button.addEventListener('click', (evt) => {
    evt.stopPropagation();
    closeMessage();
    if (message.classList.contains('error')) {
      fileInput.click();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(message);
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';

  const formData = new FormData(evt.target);

  sendData(formData)
    .then(() => {
      closeForm();
      showMessage(successTemplate);
    })
    .catch(() => {
      overlay.classList.add('hidden');
      body.classList.remove('modal-open');
      showMessage(errorTemplate);
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    });
};
const stopEscPropagation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const handleEffectChange = (evt) => {
  onEffectChange(evt, imagePreview);
  initSlider(effectLevelSlider, effectLevel, effectLevelValue, imagePreview);
};

const initForm = () => {
  fileInput.addEventListener('change', onFileChange);
  cancelButton.addEventListener('click', onCancelClick);
  form.addEventListener('submit', onFormSubmit);

  hashtagInput.addEventListener('input', onHashtagInput);

  commentInput.addEventListener('input', onHashtagInput);

  hashtagInput.addEventListener('keydown', stopEscPropagation);
  commentInput.addEventListener('keydown', stopEscPropagation);

  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  effectsList.addEventListener('change', handleEffectChange);

  blockSubmitButton();
};

initForm();

export { closeForm };
