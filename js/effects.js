const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    filter: '',
    unit: '',
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    unit: '',
  },
};

let currentEffect = 'none';

const initSlider = (effectLevelSlider, effectLevel, effectLevelValue, imagePreview) => {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = '';
    effectLevelValue.value = '';
    return;
  }

  effectLevel.classList.remove('hidden');

  const { min, max, step } = EFFECTS[currentEffect];

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = value;

    if (currentEffect !== 'none') {
      const { filter, unit } = EFFECTS[currentEffect];
      imagePreview.style.filter = `${filter}(${value}${unit})`;
    }
  });
};

const onEffectChange = (evt, imagePreview) => {
  if (evt.target.closest('.effects__radio')) {
    currentEffect = evt.target.value;

    imagePreview.className = '';
    imagePreview.classList.add(`effects__preview--${currentEffect}`);
  }
};

const resetEffects = (imagePreview) => {
  currentEffect = 'none';
  imagePreview.style.filter = '';
  imagePreview.className = '';
  imagePreview.classList.add('effects__preview--none');
};

export { initSlider, onEffectChange, resetEffects };
