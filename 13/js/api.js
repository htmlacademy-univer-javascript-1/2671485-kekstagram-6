const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

const getData = async () => {
  const response = await fetch(Urls.GET);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные');
  }
  return response.json();
};

const sendData = async (body) => {
  const response = await fetch(Urls.POST, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error('Не удалось отправить данные');
  }
  return response.json();
};

export { getData, sendData };
