// Функция для проверки длины строки
const checkLength = (text, maxLength) => text.length <= maxLength;

// Примеры использования
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false


//Функция для проверки, является ли строка палиндромом
const isPalindrome = (text) => {
  const normalizedText = text.toLowerCase();
  const reversedText = normalizedText.split('').reverse().join('');
  return normalizedText === reversedText;
};
console.log(isPalindrome('топот')); // true
console.log(isPalindrome('ДовОд')); // true
console.log(isPalindrome('Кекс'));  // false
