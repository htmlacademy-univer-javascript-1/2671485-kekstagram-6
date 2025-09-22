// Функция для проверки длины строки
const checkLength = (text, maxLength) => text.length <= maxLength;

// Примеры использования
checkLength('проверяемая строка', 20); // true
checkLength('проверяемая строка', 18); // true
checkLength('проверяемая строка', 10); // false


//Функция для проверки, является ли строка палиндромом
const isPalindrome = (text) => {
  const normalizedText = text.toLowerCase();
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
};
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс');  // false
