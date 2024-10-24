'use client';

import { useState } from 'react';
import { CrossCircledIcon, CheckCircledIcon, Cross1Icon } from '@radix-ui/react-icons';

interface DropzoneProps {
  onFileUpload: (content: string) => void;
  onGenerateFlashcards: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload, onGenerateFlashcards }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [showGenerateButton, setShowGenerateButton] = useState<boolean>(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'md') {
        setErrorMessage('Only Markdown files are allowed.');
        setUploadStatus(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
        setUploadStatus('File uploaded successfully.');
        setErrorMessage(null);
        setFileInfo({ name: file.name, size: file.size });
        setShowGenerateButton(true);
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setFileInfo(null);
    setUploadStatus(null);
    setErrorMessage(null);
    setShowGenerateButton(false); 
  }

  const handleGenerateFlashcards = () => {
    onGenerateFlashcards();
    setShowGenerateButton(false); // Hide the generate button after it is clicked
};

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!fileInfo ? (
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Notes in .md (Markdown Files)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      ) : (
        <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{fileInfo.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{(fileInfo.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
            >
              <Cross1Icon className='w-5 h-5 hover:scale-105 transition-transform duration-300'/>
            </button>
          </div>
        </div>
      )}
        {errorMessage && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"> <CrossCircledIcon /> {errorMessage}</p>}
        {uploadStatus && <p className="mt-2 text-sm text-green-500 flex items-center gap-1"> <CheckCircledIcon /> {uploadStatus}</p>}
        <div>
            {!fileInfo ? (<div></div>) : (
                <div>
                  {showGenerateButton && (
                    <button
                      className="mt-4 px-4 py-2 bg-neutral-500 text-white rounded hover:bg-neutral-700"
                      onClick={handleGenerateFlashcards}
                    >
                      Generate Flashcards
                    </button>
                    )}
                </div>
            ) }
        </div>
    </div>
  );
};

export default Dropzone;