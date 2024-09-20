"use client";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@radix-ui/react-popover";
import { useAuth } from "../context/AuthContext";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "../../../components/input";
import { Textarea } from "../../../components/textarea";
import { cn } from "../lib/util";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../@/components/ui/select";
import { Button } from "../../../@/components/ui/button";
import {
    Briefcase,
    Building,
    CalendarIcon,
    ChartBar,
    ChevronRight,
    Clock,
    Code,
    GraduationCap,
    HammerIcon,
    HeartPulse,
    Leaf,
    Palette,
    RepeatIcon,
    Scale,
    ShieldCheck,
    Users,
    Zap,
} from "lucide-react";
import Sidebar from "../home/Sidebar";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useTheme } from "next-themes";
import { Calendar } from "../../../components/calendar";

const departments = [
    { value: "rh", label: "Ressources Humaines", icon: Users },
    { value: "ti", label: "Technologies de l'Information", icon: Code },
    { value: "legal", label: "Juridique", icon: Scale },
    { value: "finance", label: "Finance", icon: ChartBar },
    { value: "marketing", label: "Marketing", icon: Palette },
    { value: "operations", label: "Opérations", icon: Building },
    { value: "ventes", label: "Ventes", icon: Briefcase },
    { value: "rnd", label: "Recherche et Développement", icon: Zap },
    { value: "sante", label: "Santé et Sécurité", icon: HeartPulse },
    {
        value: "formation",
        label: "Formation et Développement",
        icon: GraduationCap,
    },
    {
        value: "environnement",
        label: "Environnement et Durabilité",
        icon: Leaf,
    },
    { value: "securite", label: "Sécurité", icon: ShieldCheck },
];

const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const staggerChildren: Variants = {
    animate: { transition: { staggerChildren: 0.1 } },
};

export default function AutomatisationPage() {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const [date, setDate] = useState<Date>();
    const [isRouterReady, setIsRouterReady] = useState(false);
    const [formProgress, setFormProgress] = useState(0);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setIsRouterReady(true);
    }, []);

    useEffect(() => {
        if (isRouterReady && !loading && !currentUser) {
            router.push("/login");
        }
    }, [currentUser, loading, router, isRouterReady]);

    const formSteps = [
        { title: "Tâche", icon: Zap },
        { title: "Département", icon: Users },
        { title: "Temps", icon: Clock },
        { title: "Fréquence", icon: RepeatIcon },
        { title: "Outils", icon: HammerIcon },
    ];

    const handleStepComplete = (step: number) => {
        setCurrentStep(step + 1);
        setFormProgress((step + 1) * (100 / formSteps.length));
    };

    // Ajoute ici l'effet de flottement pour le titre
    const floatingTitleVariants: Variants = {
        initial: { y: 0 },
        animate: {
            y: [0, -8, 0], // Mouvement vertical
            transition: {
                duration: 3, // Durée du cycle complet (aller-retour)
                ease: "easeInOut",
                repeat: Infinity, // Répétition infinie
            },
        },
    };

    if (loading || !isRouterReady) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <Zap size={48} className="text-primary" />
                </motion.div>
            </div>
        );
    }

    if (!currentUser) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-grow p-8">
                <motion.h1
                    className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-white"
                    variants={floatingTitleVariants} // Ajout de l'animation de flottement
                    initial="initial"
                    animate="animate"
                >
                    Demande d'Automatisation
                </motion.h1>
                <motion.div variants={fadeInUp}>
                    <Card className="w-full">
                        <CardContent className="p-6">
                            <motion.div
                                className="mb-8"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <Progress
                                    value={formProgress}
                                    className="w-full h-2"
                                />
                                <div className="flex justify-between mt-2">
                                    {formSteps.map((step, index) => (
                                        <motion.div
                                            key={step.title}
                                            initial={{
                                                scale: 0.8,
                                                opacity: 0.5,
                                            }}
                                            animate={{
                                                scale:
                                                    currentStep >= index
                                                        ? 1
                                                        : 0.8,
                                                opacity:
                                                    currentStep >= index
                                                        ? 1
                                                        : 0.5,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.1,
                                            }}
                                            className="flex flex-col items-center"
                                        >
                                            <step.icon
                                                size={24}
                                                className={
                                                    currentStep >= index
                                                        ? "text-primary"
                                                        : "text-muted-foreground"
                                                }
                                            />
                                            <span className="text-xs mt-1">
                                                {step.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentStep === 0 && (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerChildren}
                                        >
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="tache"
                                                    className="text-sm font-medium"
                                                >
                                                    Tâche à automatiser
                                                </label>
                                                <Input
                                                    id="tache"
                                                    placeholder="Décrivez la tâche à automatiser"
                                                    required
                                                    className="mt-1"
                                                />
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="description"
                                                    className="text-sm font-medium"
                                                >
                                                    Description détaillée
                                                </label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Fournissez plus de détails sur la tâche"
                                                    required
                                                    className="mt-1 h-32"
                                                />
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <Button
                                                    onClick={() =>
                                                        handleStepComplete(0)
                                                    }
                                                    className="w-full"
                                                >
                                                    Suivant{" "}
                                                    <ChevronRight
                                                        className="ml-2"
                                                        size={16}
                                                    />
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                    {currentStep === 1 && (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerChildren}
                                        >
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="departement"
                                                    className="text-sm font-medium text-foreground"
                                                >
                                                    Département concerné
                                                </label>
                                                <Select
                                                    onValueChange={
                                                        setSelectedDepartment
                                                    }
                                                    value={selectedDepartment}
                                                >
                                                    <SelectTrigger className="w-full mt-1 bg-background text-foreground border border-input">
                                                        <SelectValue placeholder="Sélectionnez un département" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-background border border-input">
                                                        {departments.map(
                                                            (dept) => (
                                                                <SelectItem
                                                                    key={
                                                                        dept.value
                                                                    }
                                                                    value={
                                                                        dept.value
                                                                    }
                                                                    className="text-foreground hover:bg-accent hover:text-accent-foreground"
                                                                >
                                                                    <div className="flex items-center">
                                                                        <dept.icon className="mr-2 h-4 w-4" />
                                                                        <span>
                                                                            {
                                                                                dept.label
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="employees"
                                                    className="text-sm font-medium flex items-center text-foreground"
                                                >
                                                    <Users className="mr-2 h-4 w-4" />
                                                    Nombre d'employés concernés
                                                </label>
                                                <Input
                                                    id="employees"
                                                    type="number"
                                                    placeholder="Entrez le nombre d'employés"
                                                    required
                                                    className="mt-1 bg-background text-foreground border border-input"
                                                />
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <Button
                                                    onClick={() =>
                                                        handleStepComplete(1)
                                                    }
                                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    Suivant{" "}
                                                    <ChevronRight
                                                        className="ml-2"
                                                        size={16}
                                                    />
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                    {currentStep === 2 && (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerChildren}
                                        >
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="temps-estime"
                                                    className="text-sm font-medium"
                                                >
                                                    Temps estimé par occurrence
                                                </label>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <Input
                                                        id="temps-estime"
                                                        type="number"
                                                        placeholder="Durée"
                                                        required
                                                    />
                                                    <Select defaultValue="minutes">
                                                        <SelectTrigger className="w-[110px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="minutes">
                                                                Minutes
                                                            </SelectItem>
                                                            <SelectItem value="heures">
                                                                Heures
                                                            </SelectItem>
                                                            <SelectItem value="jours">
                                                                Jours
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <Button
                                                    onClick={() =>
                                                        handleStepComplete(2)
                                                    }
                                                    className="w-full"
                                                >
                                                    Suivant{" "}
                                                    <ChevronRight
                                                        className="ml-2"
                                                        size={16}
                                                    />
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                    {currentStep === 3 && (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerChildren}
                                        >
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="frequence"
                                                    className="text-sm font-medium"
                                                >
                                                    Fréquence
                                                </label>
                                                <Select>
                                                    <SelectTrigger className="w-full mt-1">
                                                        <SelectValue placeholder="Sélectionnez la fréquence" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="quotidien">
                                                            Quotidien
                                                        </SelectItem>
                                                        <SelectItem value="hebdomadaire">
                                                            Hebdomadaire
                                                        </SelectItem>
                                                        <SelectItem value="mensuel">
                                                            Mensuel
                                                        </SelectItem>
                                                        <SelectItem value="trimestriel">
                                                            Trimestriel
                                                        </SelectItem>
                                                        <SelectItem value="annuel">
                                                            Annuel
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="date-debut"
                                                    className="text-sm font-medium"
                                                >
                                                    Date de début souhaitée
                                                </label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={`w-full mt-1 justify-start text-left font-normal ${
                                                                !date &&
                                                                "text-muted-foreground"
                                                            }`}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {date ? (
                                                                format(
                                                                    date,
                                                                    "PPP",
                                                                    {
                                                                        locale: fr,
                                                                    }
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Choisir une
                                                                    date
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            className="rounded-md border"
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </motion.div>
                                            <motion.div variants={fadeInUp}>
                                                <Button
                                                    onClick={() =>
                                                        handleStepComplete(3)
                                                    }
                                                    className="w-full"
                                                >
                                                    Suivant{" "}
                                                    <ChevronRight
                                                        className="ml-2"
                                                        size={16}
                                                    />
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                    {currentStep === 4 && (
                                        <motion.div
                                            className="space-y-4"
                                            variants={staggerChildren}
                                        >
                                            <motion.div variants={fadeInUp}>
                                                <label
                                                    htmlFor="outils-actuels"
                                                    className="text-sm font-medium"
                                                >
                                                    Outils actuellement utilisés
                                                </label>
                                                <Input
                                                    id="outils-actuels"
                                                    placeholder="Ex: Excel, Plateforme XYZ, Méthode manuelle"
                                                    required
                                                    className="mt-1"
                                                />
                                            </motion.div>
                                            <motion.div
                                                variants={fadeInUp}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                                >
                                                    Soumettre la demande
                                                </Button>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}
