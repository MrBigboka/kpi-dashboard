"use client";

import React from "react";
import Sidebar from "../home/Sidebar";
import FilesTab from "./FilesTab";

const FilesPage = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow">
                    <FilesTab />
                </div>
            </div>
            <footer className="relative z-10 w-full bg-zinc-900 text-center p-4 text-white mt-auto">
                <p className="text-sm sm:text-base">
                    © 2024 SmartScaling | Tableau de bord - Tous droits réservés
                </p>
            </footer>
        </div>
    );
};

export default FilesPage;
