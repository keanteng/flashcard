'use client';

import { useState } from 'react';
import Dropzone from '@/components/flashcard/dropzone';
import { flashcardData } from '@/utils/data';
import { SymbolIcon, DownloadIcon } from '@radix-ui/react-icons';
import { flashcard_generator } from '@/utils/actions';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [jsonOutput, setJsonOutput] = useState<any>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileUpload = (content: string) => {
    setFileContent(content);
  };

  const handleGenerateFlashcards = async () => {
    setJsonOutput(null)
    if (!fileContent) return;
    setLoading(true);
    console.log(fileContent) // the content
    try {
      const data = await flashcard_generator(fileContent);
      setTimeout(() => {
        setLoading(false);
        setJsonOutput(data);
      }, 1000);
    } catch (error) {
      console.error('Error processing file:', error);
      setLoading(false);
    }
  };

  const handldRemoveFile = () => {
    setJsonOutput(null)
  }

  const downloadCSV = () => {
    if (!jsonOutput) return;

    const headers = ['Question', 'Answer'];
    const rows = jsonOutput.map((item: any) => [item.question, item.answer]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.map(header => `"${header}"`).join(',') + '\n';
    rows.forEach((row: string[]) => {
      csvContent += row.map(field => `"${field}"`).join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'flashcards.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 mt-16 min-h-screen">
      <div className="mt-16 justify-center max-w-4xl mx-auto">
        <Dropzone onFileUpload={handleFileUpload} onGenerateFlashcards={handleGenerateFlashcards} onRemoveFile={handldRemoveFile} />
      </div>
      <div className="max-w-4xl mx-auto mt-16">
        {loading && (
          <div className="w-full">
            <div className="border-2 rounded p-4 shadow-sm">
              <h2 className="font-semibold text-xl mb-4 text-center">Generated Flashcards</h2>
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        )}
        {jsonOutput && (
          <div>
            <div className="w-full">
              <div className='border-2 rounded p-6 shadow-sm'>
                <h2 className="font-semibold text-xl mb-4 text-center">Generated Flashcards</h2>
                {jsonOutput.map((item: any, index: number) => (
                  <div key={index} className="flex flex-col md:flex-row md:space-x-4 mb-4 gap-2">
                    <div className="flex-1 p-6 border rounded shadow-sm bg-white">
                      <p>{item.question}</p>
                    </div>
                    <div className="flex-1 p-6 border rounded shadow-sm bg-white">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-row w-full justify-center gap-4'>
              <button
                  className="my-10 p-2 rounded-md text-sm gap-2 items-center flex border-2 shadow-sm hover:scale-105"
                  onClick={handleGenerateFlashcards}
                >
                  <SymbolIcon className="w-4 h-4 text-gray-600" />
                  <span>Regenerate Response</span>
              </button>
              <button
                className="my-10 p-2 rounded-md text-sm gap-2 items-center flex border-2 shadow-sm hover:scale-105"
                onClick={downloadCSV}
              >
                <DownloadIcon /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};