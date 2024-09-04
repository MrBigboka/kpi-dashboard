import { Download } from "lucide-react"; // Import an icon from shadcn
import { Button } from "../../../@/components/ui/button";
import { cn } from "../lib/util";

export default function DownloadButton() {
  return (
    <Button
      variant="default"
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white",
        "px-5 py-2.5 rounded-md", // Padding légèrement augmenté
        "flex items-center justify-center space-x-3", // Espace entre les éléments
        "transition-colors duration-200"
      )}
    >
      <Download className="h-5 w-5" />{" "}
      {/* Pas besoin de mr-2 grâce à space-x-3 */}
      <span>Télécharger le rapport</span>
    </Button>
  );
}
