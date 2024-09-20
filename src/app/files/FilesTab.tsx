import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/table";
import FileUpload from "../helper/FileUpload";
import { FileText, Image, File as FileIcon, Loader2 } from "lucide-react";

interface FileData {
    id: string;
    name: string;
    size: string;
    date: string;
    type: string;
}

const FilesTab: React.FC = () => {
    const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

    // Fonction pour récupérer la liste des fichiers depuis Google Drive
    const fetchFiles = async () => {
        try {
            const response = await fetch(`/api/listFiles`);
            const data = await response.json();
            if (data.files) {
                const files: FileData[] = data.files.map((file: any) => ({
                    id: file.id,
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(2) + " MB", // Convertir la taille en MB
                    date: new Date(file.modifiedTime).toLocaleDateString(),
                    type: file.mimeType,
                }));
                setUploadedFiles(files);
            }
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des fichiers :",
                error
            );
        } finally {
            setIsLoading(false); // Fin du chargement
        }
    };

    // Appeler l'API au montage du composant pour charger les fichiers
    useEffect(() => {
        // Timeout maximum de 9 secondes pour s'assurer que l'écran de chargement ne dure pas indéfiniment
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 9000);

        fetchFiles();

        return () => clearTimeout(timeoutId); // Nettoyage du timeout
    }, []);

    function getFileIcon(type: string) {
        if (type.startsWith("image/")) {
            return <Image className="h-5 w-5 text-muted-foreground" />;
        } else if (type === "application/pdf") {
            return <FileText className="h-5 w-5 text-muted-foreground" />;
        } else {
            return <FileIcon className="h-5 w-5 text-muted-foreground" />;
        }
    }

    const handleFileDrop = (acceptedFiles: File[]) => {
        // Pour l'instant, on ajoute des fichiers mockés
        const newFiles = acceptedFiles.map((file, index) => ({
            id: `${Date.now()}-${index}`,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            date: new Date().toLocaleDateString(),
            type: file.type,
        }));
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    // Affichage du spinner si les fichiers sont en cours de chargement
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-gray-600 dark:text-gray-300" />
            </div>
        );
    }

    return (
        <>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Fichiers actuels</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom du fichier</TableHead>
                                <TableHead>Taille</TableHead>
                                <TableHead>Date de téléversement</TableHead>
                                <TableHead>Type</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uploadedFiles.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell className="flex items-center">
                                        {getFileIcon(file.type)}
                                        <span className="ml-2">
                                            {file.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{file.date}</TableCell>
                                    <TableCell>{file.type}</TableCell>
                                </TableRow>
                            ))}
                            {uploadedFiles.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Aucun fichier téléchargé
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Glisser-déposer un fichier</CardTitle>
                </CardHeader>
                <CardContent>
                    <FileUpload onDrop={handleFileDrop} />
                </CardContent>
            </Card>
        </>
    );
};

export default FilesTab;
