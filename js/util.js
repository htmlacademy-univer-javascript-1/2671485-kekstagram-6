const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '15px 20px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = '#ff3333';
  alertContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  alertContainer.style.transition = 'opacity 0.3s ease';
  alertContainer.classList.add('data-error');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.style.opacity = '0';
    setTimeout(() => {
      if (document.body.contains(alertContainer)) {
        alertContainer.remove();
      }
    }, 300);
  }, 5000);
};

export { isEscapeKey, debounce, showAlert };
