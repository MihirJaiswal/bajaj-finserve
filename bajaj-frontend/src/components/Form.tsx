'use client';

import { useState } from 'react';
import axios from 'axios';
import Dropdown from './DropDown';
import ResponseRenderer from './ResponseRenderer';

interface ApiResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
  is_prime_found: boolean;
  file_valid: boolean;
  file_mime_type?: string;
  file_size_kb?: string;
}

export default function FormData() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    try {
      setError('');
      setResponseData(null);

      // Validate JSON
      const parsedInput = JSON.parse(jsonInput);

      // Make POST request to the backend
      const response = await axios.post<ApiResponse>('http://localhost:3000/bfhl', parsedInput);
      setResponseData(response.data);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON input. Please ensure your input is properly formatted.');
      } else {
        setError('API error. Please check the server or your request.');
      }
    }
  };

  const handleDropdownChange = (selectedOptions: string[]) => {
    setDropdownOptions(selectedOptions);
  };

  return (
    <div className="container mx-auto p-4 mt-64">
      <h1 className="text-2xl font-bold text-center mb-6">BFHL Frontend</h1>

      {/* JSON Input Field */}
      <textarea
        className="w-full p-3 border rounded-md mb-4 text-black"
        rows={4}
        placeholder='Enter JSON (e.g., {"data": ["A", "C", "z"]})'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Dropdown & Response Renderer */}
      {responseData && (
        <>
          <Dropdown onChange={handleDropdownChange} />
          <ResponseRenderer response={responseData} selectedOptions={dropdownOptions} />
        </>
      )}
    </div>
  );
}
