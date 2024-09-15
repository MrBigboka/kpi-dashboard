"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../../components/alert";

interface FileUploadProps {
    onDrop: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDrop }) => {
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);

    const handleDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                setError(null);
                setIsUploading(true);
                setUploadStatus("Envoi en cours...");
                setUploadSuccess(null);

                const uploadedFileIds: string[] = [];

                for (const file of acceptedFiles) {
                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                        const response = await fetch(
                            "/api/uploadToGoogleDrive",
                            {
                                method: "POST",
                                body: formData,
                            }
                        );

                        if (response.ok) {
                            const data = await response.json();
                            uploadedFileIds.push(data.fileId);
                        } else {
                            throw new Error("Erreur lors du téléchargement");
                        }
                    } catch (err) {
                        console.error("Erreur:", err);
                        setError("Erreur réseau lors de l'envoi du fichier");
                        setUploadSuccess(false);
                        break;
                    }
                }

                if (uploadedFileIds.length === acceptedFiles.length) {
                    setUploadStatus("Téléchargement réussi");
                    setUploadSuccess(true); // Réussi
                    onDrop(acceptedFiles); // On passe les fichiers au parent
                } else {
                    setUploadSuccess(false); // Échec
                }

                setIsUploading(false);
            }
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: {
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "application/pdf": [".pdf"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                [".docx"],
            "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                [".pptx"],
        },
        maxSize: 5000000,
    });

    return (
        <div className="flex flex-col items-center w-full space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center w-full h-32
          ${
              isDragActive ? "border-primary" : "border-muted"
          } transition duration-200`}
            >
                <input {...getInputProps()} />
                {isUploading ? (
                    <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
                ) : (
                    <Upload className="h-10 w-10 text-muted-foreground" />
                )}
                <p className="text-muted-foreground mt-2 text-center">
                    {isDragActive
                        ? "Déposez les fichiers ici..."
                        : "Glissez et déposez vos fichiers ici, ou cliquez pour télécharger"}
                </p>
            </div>

            {uploadStatus && !error && (
                <Alert
                    variant={
                        uploadSuccess === false ? "destructive" : "default"
                    }
                >
                    <AlertDescription className="flex items-center">
                        {isUploading ? (
                            <Loader2 className="mr-2 h-4 w-4 text-muted-foreground animate-spin" />
                        ) : uploadSuccess ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        )}
                        {uploadStatus}
                    </AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription className="flex flex-col">
                        <span className="flex items-center">
                            <XCircle className="mr-2 h-4 w-4" />
                            {error}
                        </span>
                        <span className="mt-2">
                            Veuillez contacter l'administration si le problème
                            persiste.
                        </span>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default FileUpload;
