const validator = require('validator');
const mime = require('mime-types');

// Check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Process input data
const processInput = (data) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let primeFound = false;

  data.forEach((item) => {
    if (validator.isInt(item)) {
      const num = parseInt(item, 10);
      numbers.push(item);
      if (isPrime(num)) primeFound = true;
    } else if (validator.isAlpha(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  return { numbers, alphabets, highestLowercase, primeFound };
};

// Validate a Base64 file
const validateBase64File = (base64) => {
  if (!base64) {
    return { valid: false, mimeType: null, sizeKb: null };
  }

  try {
    const buffer = Buffer.from(base64, 'base64');
    const mimeType = mime.lookup(buffer);
    const sizeKb = (buffer.length / 1024).toFixed(2);

    return { valid: !!mimeType, mimeType, sizeKb };
  } catch {
    return { valid: false, mimeType: null, sizeKb: null };
  }
};

module.exports = { isPrime, processInput, validateBase64File };
