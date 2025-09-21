// Cтрока короче 20 символов
//имяФункции('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
//имяФункции('проверяемая строка', 18); // true
// Строка длиннее 10 символов
//имяФункции('проверяемая строка', 10); // false

const checkLength = (text, maxLength) => text.length <= maxLength;

// Примеры использования
console.log(checkLength('проверяемая строка', 20)); // true
console.log(checkLength('проверяемая строка', 18)); // true
console.log(checkLength('проверяемая строка', 10)); // false
