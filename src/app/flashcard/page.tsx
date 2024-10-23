'use client';

import { useState } from 'react';
import Dropzone from '@/components/flashcard/dropzone';
import { flashcardData } from '@/utils/data';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonOutput, setJsonOutput] = useState<any>(null);

  const handleFileUpload = async (content: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/process-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      const data = flashcardData;
      setJsonOutput(data);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 10000)
    }
  };

    return (
      <div className=" p-4 mt-16 min-h-screen">
        <div className='mt-16 justify-center max-w-4xl mx-auto'>
          <Dropzone onFileUpload={handleFileUpload} />
        </div>
        <div className='max-w-4xl mx-auto mt-16'>
          {loading && (
           <div>add skeleton</div>
          )}
        </div>
        <div className='max-w-4xl mx-auto mt-16'>
          {jsonOutput && (
            <table className="mt-4 border-collapse border border-gray-300 justify-center">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Question</th>
                  <th className="border border-gray-300 px-4 py-2">Answer</th>
                </tr>
              </thead>
              <tbody>
                {jsonOutput.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.question}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.answer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
  );
};

export default Home;