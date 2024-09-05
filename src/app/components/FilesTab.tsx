// FilesTab.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../componentsUi/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../../../@/components/ui/table";
import FileUpload from "../helper/FileUpload";
interface FileData {
  id: number;
  name: string;
  size: string;
  date: string;
}

interface FilesTabProps {
  uploadedFiles: FileData[];
  handleFileUpload: (acceptedFiles: File[]) => void;
}

const FilesTab: React.FC<FilesTabProps> = ({
  uploadedFiles,
  handleFileUpload,
}) => {
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.date}</TableCell>
                </TableRow>
              ))}
              {uploadedFiles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
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
          <FileUpload onDrop={handleFileUpload} />
        </CardContent>
      </Card>
    </>
  );
};

export default FilesTab;
