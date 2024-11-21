const { processInput, validateBase64File } = require('../utils/helpers');

// Static data for user
const USER_ID = 'john_doe_17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

// GET handler
const getBfhl = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};

// POST handler
const postBfhl = (req, res) => {
  try {
    const { data, file_b64 } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid data input' });
    }

    const { numbers, alphabets, highestLowercase, primeFound } = processInput(data);

    const { valid: fileValid, mimeType, sizeKb } = validateBase64File(file_b64);

    res.json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
      is_prime_found: primeFound,
      file_valid: fileValid,
      file_mime_type: mimeType,
      file_size_kb: sizeKb,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error.message });
  }
};

module.exports = { getBfhl, postBfhl };
