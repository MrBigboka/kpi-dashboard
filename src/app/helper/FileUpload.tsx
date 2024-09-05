import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center"
    >
      <input {...getInputProps()} />
      <Upload className="h-10 w-10 text-gray-400" />
      <p className="text-gray-500 mt-2">
        Glissez et déposez vos fichiers ici, ou cliquez pour télécharger
      </p>
    </div>
  );
};

export default FileUpload;