import { FC } from 'react';

interface Response {
  alphabets: string[];
  numbers: string[];
  highest_lowercase_alphabet: string[];
}

interface ResponseRendererProps {
  response: Response;
  selectedOptions: string[];
}

const ResponseRenderer: FC<ResponseRendererProps> = ({ response, selectedOptions }) => {
  const { alphabets, numbers, highest_lowercase_alphabet: highestLowercase } = response;

  const renderData = () => {
    const data: JSX.Element[] = [];
    if (selectedOptions.includes('alphabets')) data.push(<p key="alphabets">Alphabets: {alphabets.join(', ')}</p>);
    if (selectedOptions.includes('numbers')) data.push(<p key="numbers">Numbers: {numbers.join(', ')}</p>);
    if (selectedOptions.includes('highestLowercaseAlphabet'))
      data.push(<p key="highest">Highest Lowercase: {highestLowercase.join(', ')}</p>);
    return data;
  };

  return (
    <div className="mt-6 p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Response Data:</h2>
      {renderData()}
    </div>
  );
};

export default ResponseRenderer;
