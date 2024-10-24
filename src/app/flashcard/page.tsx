'use client';

import { useState } from 'react';
import Dropzone from '@/components/flashcard/dropzone';
import { flashcardData } from '@/utils/data';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonOutput, setJsonOutput] = useState<any>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileUpload = (content: string) => {
    setFileContent(content);
  };

  const handleGenerateFlashcards = async () => {
    if (!fileContent) return;
    setLoading(true);
    try {
      const response = await fetch('/api/process-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: fileContent }),
      });
      const data = flashcardData;
      setTimeout(() => {
        setLoading(false);
        setJsonOutput(data);
      }, 3000);
    } catch (error) {
      console.error('Error processing file:', error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mt-16 min-h-screen">
      <div className="mt-16 justify-center max-w-4xl mx-auto">
        <Dropzone onFileUpload={handleFileUpload} onGenerateFlashcards={handleGenerateFlashcards} />
      </div>
      <div className="max-w-4xl mx-auto mt-16">
        {loading && (
          <div className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
          </div>
        )}
        {jsonOutput && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-xl mb-4 text-center">Questions</h2>
              {jsonOutput.map((item: any, index: number) => (
                <div key={index} className="p-4 border rounded shadow-sm bg-white mb-4">
                  <p>{item.question}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="font-semibold text-xl mb-4 text-center">Answers</h2>
              {jsonOutput.map((item: any, index: number) => (
                <div key={index} className="p-4 border rounded shadow-sm bg-white mb-4">
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;