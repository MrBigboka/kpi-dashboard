import React, { useState } from "react";
import { Bug, Wrench, FilePlus, HelpCircle } from "lucide-react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "../../../components/input";
import { Textarea } from "../../../components/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/select";
import { Button } from "../../../components/button";
import { motion } from "framer-motion";

const ContactTab = () => {
  const [contactType, setContactType] = useState<string>("");
  const [contactTitle, setContactTitle] = useState<string>("");
  const [contactBody, setContactBody] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactType,
          contactTitle,
          contactBody,
          userEmail: "customer@smartscaling.ca", // Vous pouvez inclure l'e-mail de l'utilisateur
        }),
      });

      if (response.ok) {
        setAlertMessage("Votre demande a été envoyée avec succès.");
        setAlertType("success");
        // Réinitialiser le formulaire après soumission réussie
        setContactType("");
        setContactTitle("");
        setContactBody("");
      } else {
        setAlertMessage(
          "Une erreur s'est produite lors de l'envoi de votre demande."
        );
        setAlertType("error");
      }
    } catch (error) {
      console.error("Erreur d'envoi de la demande:", error);
      setAlertMessage("Erreur d'envoi de la demande.");
      setAlertType("error");
    }

    // Réinitialiser l'alerte après 5 secondes
    setTimeout(() => {
      setAlertMessage(null);
      setAlertType(null);
    }, 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl mx-auto">
        {" "}
        {/* Augmenté à max-w-3xl */}
        <CardHeader>
          <CardTitle className="text-2xl">Contactez-nous</CardTitle>
          <CardDescription>
            Envoyez-nous vos commentaires, signalements de bogues, suggestions
            d'amélioration ou toute autre demande.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="contactType" className="text-sm font-medium">
                Type de demande :
              </label>
              <Select
                value={contactType}
                onValueChange={setContactType}
                required
              >
                <SelectTrigger id="contactType">
                  <SelectValue placeholder="Sélectionnez le type de demande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug" icon={<Bug className="h-4 w-4" />}>
                    Signalement de bogue
                  </SelectItem>
                  <SelectItem
                    value="improvement"
                    icon={<Wrench className="h-4 w-4" />}
                  >
                    Suggestion d'amélioration
                  </SelectItem>
                  <SelectItem
                    value="change"
                    icon={<FilePlus className="h-4 w-4" />}
                  >
                    Demande de changement
                  </SelectItem>
                  <SelectItem
                    value="other"
                    icon={<HelpCircle className="h-4 w-4" />}
                  >
                    Autre demande
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Sujet :
              </label>
              <Input
                id="title"
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                placeholder="Résumez brièvement votre demande"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="body" className="text-sm font-medium">
                Description :
              </label>
              <Textarea
                id="body"
                value={contactBody}
                onChange={(e) => setContactBody(e.target.value)}
                rows={6}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Envoyer
              <PaperPlaneIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {alertMessage && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                alertType === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {alertMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactTab;
