import { ThemeProvider } from "next-themes";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

// Ajouter des métadonnées
export const metadata = {
  title: "SmartScaling™ - KPI Dashboard", // Définit le titre
  description: "Gestion des indicateurs de performance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ajouter le favicon */}
        <link rel="icon" href="/smartscaling2.png" />
        {/* Ajouter d'autres balises meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="KPI Dashboard - Gestion des indicateurs de performance"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
