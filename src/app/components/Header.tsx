"use client";

import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { Button } from "../../../@/components/ui/button";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme } = useTheme();
  const [selectedCompany, setSelectedCompany] = useState("smartscaling");

  const companies = [
    { value: "smartscaling", name: "SmartScaling", logo: "/smartscaling2.png" },
    { value: "gestrago", name: "Gestrago", logo: "/gestrago.jpg" },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-background shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[200px] bg-background border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <SelectValue>
              {companies.find((c) => c.value === selectedCompany) && (
                <div className="flex items-center">
                  <Image
                    src={
                      companies.find((c) => c.value === selectedCompany)!.logo
                    }
                    alt={`${
                      companies.find((c) => c.value === selectedCompany)!.name
                    } Logo`}
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  <span>
                    {companies.find((c) => c.value === selectedCompany)!.name}
                  </span>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-[200px] bg-background dark:bg-gray-900">
            <SelectGroup>
              <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Entreprises
              </SelectLabel>
              {companies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  <div className="flex items-center">
                    <Image
                      src={company.logo}
                      alt={`${company.name} Logo`}
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <span>{company.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter entreprise
              </Button>
            </div>
          </SelectContent>
        </Select>
      </div>
      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}
