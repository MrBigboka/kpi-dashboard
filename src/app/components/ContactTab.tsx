// ContactTab.tsx
import React from "react";
import { Bug, Wrench, FilePlus, HelpCircle } from "lucide-react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../componentsUi/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Button } from "../../../@/components/ui/button";

const ContactTab = ({
  handleContactSubmit,
  setContactType,
  contactTitle,
  setContactTitle,
  contactBody,
  setContactBody,
}) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
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
              Type de demande
            </label>
            <Select onValueChange={setContactType} required>
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
              Titre
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
              Description
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
      </CardContent>
    </Card>
  );
};

export default ContactTab;
