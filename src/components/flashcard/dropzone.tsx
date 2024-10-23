'use client';

import { useState } from 'react';
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons';

interface DropzoneProps {
    onFileUpload: (content: string) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

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
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
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
            {errorMessage && <p className="mt-2 text-sm text-red-600 flex items-center gap-1"> <CrossCircledIcon /> {errorMessage}</p>}
            {uploadStatus && <p className="mt-2 text-sm text-green-600 flex items-center gap-1"> <CheckCircledIcon /> {uploadStatus}</p>}
        </div>
    );
};

export default Dropzone;