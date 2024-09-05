"use client";

import React, { useState } from "react";
import {
  addDays,
  differenceInDays,
  eachMonthOfInterval,
  format,
} from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import {
  Home,
  Folder,
  Mail,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";
import DateRangePicker from "../../componentsUi/ui/date-picker";
import DownloadButton from "./DownloadButton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";
import OverviewTab from "./OverviewTab";
import FilesTab from "./FilesTab";
import ContactTab from "./ContactTab";

interface FileData {
  id: number;
  name: string;
  size: string;
  date: string;
}

const metricCardsData = [
  {
    title: "Note moyenne",
    value: "4,4/5",
    description: "+0,3% depuis le mois dernier",
    icon: ThumbsUp,
    subtitle: "Satisfaction client",
  },
  {
    title: "Conversations",
    value: "12 234",
    description: "+19% depuis le mois dernier",
    icon: MessageSquare,
    subtitle: "Interactions totales",
  },
  {
    title: "Utilisateurs actifs",
    value: "1 429",
    description: "+8% depuis le mois dernier",
    icon: Users,
    subtitle: "Engagement mensuel",
  },
  {
    title: "Taux de résolution",
    value: "92%",
    description: "+5% depuis le mois dernier",
    icon: TrendingUp,
    subtitle: "Efficacité du service",
  },
];

const initialFiles: FileData[] = [
  { id: 1, name: "Rapport janvier.pdf", size: "2.3 MB", date: "01/02/2024" },
  { id: 2, name: "Rapport février.pdf", size: "3.1 MB", date: "01/03/2024" },
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  });
  const [contactTitle, setContactTitle] = useState<string>("");
  const [contactBody, setContactBody] = useState<string>("");
  const [contactType, setContactType] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>(initialFiles);

  const handleFileUpload = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Date.now(),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      date: new Date().toLocaleDateString(),
    }));
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const conversations = 12234;

  const calculateSavings = (
    conversations: number,
    dateRange: DateRange
  ): { timeSaved: number; moneySaved: number } => {
    const avgTimeWithoutBot = 12.5;
    const avgTimeWithBot = 1.5;
    const timeSavedPerConversation = avgTimeWithoutBot - avgTimeWithBot;
    const totalTimeSaved = conversations * timeSavedPerConversation;

    const hourlyRate = 50;
    const moneySaved = (totalTimeSaved / 60) * hourlyRate;

    return {
      timeSaved: Math.round(totalTimeSaved),
      moneySaved: Math.round(moneySaved),
    };
  };

  const { timeSaved, moneySaved } = calculateSavings(conversations, dateRange);

  const timeSavedText =
    timeSaved >= 60
      ? `${Math.floor(timeSaved / 60)} heures`
      : `${timeSaved} minutes`;

  const formattedMoneySaved = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(moneySaved);

  const daysInRange =
    dateRange.from && dateRange.to
      ? differenceInDays(dateRange.to, dateRange.from) + 1
      : 0;

  const generateMonthlySavingsData = (
    dateRange: DateRange
  ): { month: string; économies: number }[] => {
    if (!dateRange.from || !dateRange.to) return [];

    const months = eachMonthOfInterval({
      start: dateRange.from,
      end: dateRange.to,
    });

    return months.map((month) => {
      const conversations = Math.floor(Math.random() * 5000) + 1000;
      const { moneySaved } = calculateSavings(conversations, {
        from: month,
        to: month,
      });
      return {
        month: format(month, "MMM", { locale: fr }),
        économies: moneySaved,
      };
    });
  };

  const monthlySavingsData = generateMonthlySavingsData(dateRange);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis:", {
      contactType,
      contactTitle,
      contactBody,
    });
    setContactType("");
    setContactTitle("");
    setContactBody("");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Tableau de bord - SOFIA
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Analyse et performance du chatbot
          </p>
        </div>
        {activeTab === "overview" && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="w-full sm:w-auto">
              <DateRangePicker />
            </div>
            <div className="w-full sm:w-auto">
              <DownloadButton />
            </div>
          </div>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">
            <Home className="mr-2 h-5 w-5" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="files">
            <Folder className="mr-2 h-5 w-5" />
            Envoie de fichier
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="mr-2 h-5 w-5" />
            Contact
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab
            metricCardsData={metricCardsData}
            formattedMoneySaved={formattedMoneySaved}
            timeSavedText={timeSavedText}
            monthlySavingsData={monthlySavingsData}
            daysInRange={daysInRange}
            conversations={conversations}
          />
        </TabsContent>
        <TabsContent value="files">
          <FilesTab
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
          />
        </TabsContent>
        <TabsContent value="contact">
          <ContactTab
            handleContactSubmit={handleContactSubmit}
            setContactType={setContactType}
            contactTitle={contactTitle}
            setContactTitle={setContactTitle}
            contactBody={contactBody}
            setContactBody={setContactBody}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
